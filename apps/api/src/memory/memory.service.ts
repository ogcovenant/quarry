import { Injectable } from '@nestjs/common';
import { Memory } from './entities/memory.entity';
import { DataSource, type FindOptionsWhere } from 'typeorm';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { EmbeddingsService } from './services/embeddings.service';
import {
  BaseIndexMemoryInput,
  IndexNoteMemoryInput,
  IndexSourceMemoryInput,
  MemorySearchInput,
  MemorySearchResult,
  MemoryTarget,
} from './memory.interface';
import pgvector from 'pgvector';
import { Document } from '@langchain/core/documents';

@Injectable()
export class MemoryService {
  private readonly splitter: RecursiveCharacterTextSplitter;

  constructor(
    private readonly dataSource: DataSource,
    private readonly embeddingService: EmbeddingsService,
  ) {
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 900,
      chunkOverlap: 150,
      separators: ['\n\n', '\n', '. ', ' ', ''],
    });
  }

  async indexSource(input: IndexSourceMemoryInput): Promise<Memory[]> {
    return this.indexContent(
      input,
      {
        memoryType: 'source',
        sourceId: input.sourceId,
        noteId: null,
      },
      {
        userId: input.userId,
        sourceId: input.sourceId,
        contentVersion: input.contentVersion,
      },
    );
  }

  async indexNote(input: IndexNoteMemoryInput): Promise<Memory[]> {
    return this.indexContent(
      input,
      {
        memoryType: 'note',
        sourceId: null,
        noteId: input.noteId,
      },
      {
        userId: input.userId,
        noteId: input.noteId,
        contentVersion: input.contentVersion,
      },
    );
  }

  private async indexContent(
    input: BaseIndexMemoryInput,
    target: MemoryTarget,
    deleteCriteria: FindOptionsWhere<Memory>,
  ): Promise<Memory[]> {
    const text = input.content.trim();

    if (!text) {
      return [];
    }

    const chunks = await this.splitter.splitText(text);
    const embeddings = await this.embeddingService.embedDocuments(chunks);

    return this.dataSource.transaction(async (manager) => {
      const memoryRepository = manager.getRepository(Memory);

      const rows = chunks.map((content, index) =>
        memoryRepository.create({
          content,
          embeddings: embeddings[index],
          metadata: input.metadata,
          contentVersion: input.contentVersion,
          memoryType: target.memoryType,
          chunkIndex: index,
          sourceId: target.sourceId ?? null,
          noteId: target.noteId ?? null,
          projectId: input.projectId ?? null,
          userId: input.userId,
        }),
      );

      await memoryRepository.delete(deleteCriteria);

      return memoryRepository.save(rows, {
        chunk: 100,
      });
    });
  }

  async search(input: MemorySearchInput): Promise<MemorySearchResult[]> {
    const limit = Math.min(Math.max(input.limit ?? 8, 1), 50);

    const queryEmbedding = await this.embeddingService.embedQuery(input.query);

    const serializedQueryEmbedding = pgvector.toSql(queryEmbedding);

    const queryBuilder = this.dataSource
      .getRepository(Memory)
      .createQueryBuilder('memory')
      .addSelect('1 - (memory.embeddings <=> :embedding)', 'similarity')
      .where('memory.user_id = :userId', { userId: input.userId })
      .andWhere('memory.embeddings IS NOT NULL')
      .setParameter('embedding', serializedQueryEmbedding);

    if (input.projectId) {
      queryBuilder.andWhere('memory.project_id = :projectId', {
        projectId: input.projectId,
      });
    }

    if (input.noteId) {
      queryBuilder.andWhere('memory.note_id = :noteId', {
        noteId: input.noteId,
      });
    }

    if (input.sourceId) {
      queryBuilder.andWhere('memory.source_id = :sourceId', {
        sourceId: input.sourceId,
      });
    }

    if (input.minimumSimilarity !== undefined) {
      queryBuilder.andWhere(
        '1 - (memory.embeddings <=> :embedding) >= :minimumSimilarity',
        {
          minimumSimilarity: input.minimumSimilarity,
        },
      );
    }

    const result = await queryBuilder
      .orderBy('memory.embeddings <=> :embedding', 'ASC')
      .take(limit)
      .getRawAndEntities();

    const rawRows = result.raw as Array<{ similarity?: number | string }>;

    return result.entities.map((chunk, index) => ({
      chunk,
      similarity: Number(rawRows[index]?.similarity ?? 0),
    }));
  }

  async searchDocuments(input: MemorySearchInput): Promise<Document[]> {
    const results = await this.search(input);

    return results.map(
      ({ chunk, similarity }) =>
        new Document({
          pageContent: chunk.content,

          metadata: {
            ...chunk.metadata,

            memoryId: chunk.id,

            userId: chunk.userId,
            projectId: chunk.projectId,
            sourceId: chunk.sourceId,
            noteId: chunk.noteId,
            contentVersion: chunk.contentVersion,
            memoryType: chunk.memoryType,
            chunkIndex: chunk.chunkIndex,

            similarity,
          },
        }),
    );
  }
}
