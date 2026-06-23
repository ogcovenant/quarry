import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Source } from './entities/source.entity';
import { Repository } from 'typeorm';
import { UploadSourceDto } from './dto/upload-source.dto';
import { S3Client, S3ClientConfig, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedUser } from 'src/auth/interfaces/authenticated-user.interface';
import { ProjectsService } from 'src/projects/projects.service';
import { Projects } from 'src/projects/entities/project.entity';
import { randomUUID } from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SourceService {
  private s3;

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
      uploadUrl,
      sourceUuid: source.uuid,
      storageKey,
    };
  }
}
