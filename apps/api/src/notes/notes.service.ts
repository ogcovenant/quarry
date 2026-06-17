import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from './entities/note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {}

  async createNote(body: CreateNoteDto, userId: number) {
    const { title, content, projectId } = body;
  }

  async getAllNotes() {}

  async getSingleNote() {}

  async updateSingleNote() {}

  async deleteSingleNote() {}
}
