import { Injectable } from '@nestjs/common';
import { Memory } from './entities/memory.entity';
import { DataSource, type FindOptionsWhere } from 'typeorm';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { EmbeddingsService } from './services/embeddings.service';
import {
  BaseIndexMemoryInput,
  IndexNoteMemoryInput,
  IndexSourceMemoryInput,
  MemoryTarget,
} from './memory.interface';

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

  async search() {}

  async searchDocuments() {}
}
