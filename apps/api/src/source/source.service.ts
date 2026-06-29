import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Source } from './entities/source.entity';
import { Repository } from 'typeorm';
import { UploadSourceDto } from './dto/upload-source.dto';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedUser } from 'src/auth/interfaces/authenticated-user.interface';
import { ProjectsService } from 'src/projects/projects.service';
import { Projects } from 'src/projects/entities/project.entity';
import { randomUUID } from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { User } from 'src/users/entities/user.entity';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { createPaginatedResponse } from 'src/common/pagination/utils/create-paginated-response';
import { PDFParse } from 'pdf-parse';
import * as mammoth from 'mammoth';

@Injectable()
export class SourceService {
  private s3: S3Client;

  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
    private readonly configService: ConfigService,
    private readonly projectService: ProjectsService,
  ) {
    this.s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${configService.get<string>('CLOUDFLARE_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: configService.get<string>(
          'CLOUDFLARE_R2_ACCESS_KEY_ID',
        ) as string,
        secretAccessKey: configService.get<string>(
          'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
        ) as string,
      },
    });
  }

  async getUploadUrl(body: UploadSourceDto, user: AuthenticatedUser) {
    const { filename, mimeType, projectUuid } = body;

    let project: Projects | null = null;

    if (projectUuid) {
      project = await this.projectService.getSingleProject(
        projectUuid,
        user.id,
      );

      if (!project) {
        throw new BadRequestException('Invalid project selection');
      }
    }

    const source = new Source();

    // Generate UUID ahead of time so it can be used in the storage key
    source.uuid = randomUUID();

    const storageKey = `sources/${user.uuid}/${source.uuid}/${filename}`;

    source.filename = filename;
    source.mimeType = mimeType;
    source.storageKey = storageKey;
    source.user = {
      id: user.id,
    } as User;

    if (project) {
      source.project = project;
    }

    await this.sourceRepository.save(source);

    const uploadUrl = await getSignedUrl(
      this.s3,
      new PutObjectCommand({
        Bucket: this.configService.get<string>('CLOUDFLARE_BUCKET_NAME'),
        Key: storageKey,
        ContentType: mimeType,
      }),
      { expiresIn: 3600 },
    );

    return {
      url: uploadUrl,
      uuid: source.uuid,
      key: storageKey,
    };
  }

  async getAllSources(userId: number, query: PaginationQueryDto) {
    const { page, limit } = query;

    const [sources, total] = await this.sourceRepository.findAndCount({
      where: {
        user: {
          id: userId,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        uuid: true,
        filename: true,
        mimeType: true,
        storageKey: true,
        createdAt: true,
        updatedAt: true,
        project: true,
      },
    });

    return createPaginatedResponse(sources, total, query);
  }

  async getDownloadUrl(sourceUuid: string, userId: number) {
    const source = await this.sourceRepository.findOne({
      where: {
        uuid: sourceUuid,
        user: {
          id: userId,
        },
      },
    });

    if (!source) {
      throw new NotFoundException('Source not found');
    }

    const downloadUrl = await getSignedUrl(
      this.s3,
      new GetObjectCommand({
        Bucket: this.configService.get<string>('CLOUDFLARE_BUCKET_NAME'),
        Key: source.storageKey,
      }),
      { expiresIn: 3600 },
    );

    return {
      url: downloadUrl,
    };
  }

  async deleteSource(sourceUuid: string, userId: number) {
    const source = await this.sourceRepository.findOne({
      where: {
        uuid: sourceUuid,
        user: {
          id: userId,
        },
      },
    });

    if (!source) {
      throw new NotFoundException('Source not found');
    }

    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get<string>('CLOUDFLARE_BUCKET_NAME'),
        Key: source.storageKey,
      }),
    );

    await this.sourceRepository.delete({ id: source.id });

    return null;
  }

  async fetchSourceById(sourceId: number) {
    return this.sourceRepository.findOne({
      where: {
        id: sourceId,
      },
      relations: {
        project: true,
        user: true,
      },
    });
  }

  async extractContentFromSource(source: Source): Promise<string> {
    const { storageKey } = source;
    const { Body } = await this.s3.send(
      new GetObjectCommand({
        Bucket: this.configService.get<string>('CLOUDFLARE_BUCKET_NAME'),
        Key: storageKey,
      }),
    );

    if (!Body) {
      throw new BadRequestException('Source file is empty');
    }

    const buffer = Buffer.from(await Body.transformToByteArray());

    if (this.isPdfSource(source)) {
      return this.extractPdfText(buffer);
    }

    if (this.isDocxSource(source)) {
      return this.extractDocxText(buffer);
    }

    if (this.isTextSource(source)) {
      return buffer.toString('utf-8');
    }

    throw new BadRequestException(
      `Unsupported source file type: ${source.mimeType}`,
    );
  }

  private async extractPdfText(buffer: Buffer): Promise<string> {
    const parser = new PDFParse({ data: new Uint8Array(buffer) });

    try {
      const result = await parser.getText();
      return result.text;
    } finally {
      await parser.destroy();
    }
  }

  private async extractDocxText(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  private isPdfSource(source: Source) {
    return (
      source.mimeType === 'application/pdf' ||
      this.getSourceExtension(source) === '.pdf'
    );
  }

  private isDocxSource(source: Source) {
    return (
      source.mimeType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      this.getSourceExtension(source) === '.docx'
    );
  }

  private isTextSource(source: Source) {
    const extension = this.getSourceExtension(source);

    return (
      source.mimeType.startsWith('text/') ||
      [
        'application/json',
        'application/xml',
        'application/x-ndjson',
        'application/yaml',
      ].includes(source.mimeType) ||
      [
        '.txt',
        '.md',
        '.markdown',
        '.csv',
        '.json',
        '.xml',
        '.yaml',
        '.yml',
      ].includes(extension)
    );
  }

  private getSourceExtension(source: Source) {
    const filename = source.filename.toLowerCase();
    const extensionStartIndex = filename.lastIndexOf('.');

    if (extensionStartIndex === -1) {
      return '';
    }

    return filename.slice(extensionStartIndex);
  }
}
