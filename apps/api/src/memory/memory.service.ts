import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memory } from './entities/memory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(Memory)
    private memoryRepository: Repository<Memory>,
  ) {}

  async storeSingleMemory(content: string) {}

  async extractMemoryFromContent(content: string) {}

  async getSourceMemory(sourceId: number, content: string) {}

  async getNoteMemory(noteId: number, content: string) {}
}
