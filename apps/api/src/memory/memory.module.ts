import { forwardRef, Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memory } from './entities/memory.entity';
import { EmbeddingsService } from './services/embeddings.service';
import { embeddingsProvider } from './providers/embeddings.provider';
import { BullModule } from '@nestjs/bullmq';
import { SourceModule } from 'src/source/source.module';
import { NotesModule } from 'src/notes/notes.module';
import { MemoryQueueService } from './memory-queue.service';
import { MemoryProcessor } from './memory.processor';

@Module({
  imports: [
    forwardRef(() => NotesModule),
    forwardRef(() => SourceModule),
    TypeOrmModule.forFeature([Memory]),
    BullModule.registerQueue({
      name: 'memory',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'fixed',
          delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    }),
  ],
  providers: [
    MemoryService,
    embeddingsProvider,
    EmbeddingsService,
    MemoryQueueService,
    MemoryProcessor,
  ],
  exports: [MemoryQueueService],
})
export class MemoryModule {}
