import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memory } from './entities/memory.entity';
import { EmbeddingsService } from './services/embeddings.service';
import { embeddingsProvider } from './providers/embeddings.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Memory])],
  providers: [MemoryService, embeddingsProvider, EmbeddingsService],
})
export class MemoryModule {}
