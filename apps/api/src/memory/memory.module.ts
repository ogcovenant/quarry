import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memory } from './entities/memory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Memory])],
  providers: [MemoryService],
})
export class MemoryModule {}
