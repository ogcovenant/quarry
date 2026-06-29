import { forwardRef, Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notes } from './entities/note.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { MemoryModule } from 'src/memory/memory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notes]),
    forwardRef(() => ProjectsModule),
    forwardRef(() => MemoryModule),
  ],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}
