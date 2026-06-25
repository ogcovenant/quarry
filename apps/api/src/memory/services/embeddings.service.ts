import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EMBEDDINGS } from '../providers/embeddings.provider';
import type { EmbeddingsInterface } from '@langchain/core/embeddings';
import { EMBEDDING_DIMENSIONS } from '../constants/embedding.constants';

@Injectable()
export class EmbeddingsService {
  constructor(
    @Inject(EMBEDDINGS)
    private readonly embeddings: EmbeddingsInterface,
  ) {}

  async embedDocuments(documents: string[]): Promise<number[][]> {
    const vectors = await this.embeddings.embedDocuments(documents);
    vectors.forEach((vector) => this.assertEmbeddingsDimensions(vector));
    return vectors;
  }

  async embedQuery(query: string): Promise<number[]> {
    const vector = await this.embeddings.embedQuery(query);
    this.assertEmbeddingsDimensions(vector);
    return vector;
  }

  private assertEmbeddingsDimensions(vector: number[]): void {
    if (vector.length !== EMBEDDING_DIMENSIONS) {
      throw new InternalServerErrorException(
        `Vector dimension mismatch: expected ${EMBEDDING_DIMENSIONS}, got ${vector.length}`,
      );
    }
  }
}
