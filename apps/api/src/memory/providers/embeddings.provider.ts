import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { EmbeddingsInterface } from '@langchain/core/embeddings';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { EMBEDDING_DEFAULT_MODEL } from '../constants/embedding.constants';

export const EMBEDDINGS = Symbol('EMBEDDINGS');

export const embeddingsProvider: Provider = {
  provide: EMBEDDINGS,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): EmbeddingsInterface => {
    return new GoogleGenerativeAIEmbeddings({
      apiKey: configService.get<string>('GEMINI_API_KEY'),
      model:
        configService.get<string>('EMBEDDING_MODEL') ?? EMBEDDING_DEFAULT_MODEL,
    });
  },
};
