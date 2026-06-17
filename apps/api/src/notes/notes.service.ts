import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from './entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {}

  async createNote() {}

  async getAllNotes() {}

  async getSingleNote() {}

  async updateSingleNote() {}

  async deleteSingleNote() {}
}
