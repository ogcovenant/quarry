import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { IndexMemoryQueueInput } from './memory.interface';

@Injectable()
export class MemoryQueueService {
  constructor(@InjectQueue('memory') private readonly memoryQueue: Queue) {}

  async indexMemory(input: IndexMemoryQueueInput) {
    return this.memoryQueue.add('index-memory', input);
  }
}
