import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { NotesService } from './notes.service';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('/')
  async createNote() {
    return this.notesService.createNote();
  }

  @Get('/')
  async getAllNotes() {
    return this.notesService.getAllNotes();
  }

  @Get('/:uuid')
  async getSingleNote() {
    return this.notesService.getSingleNote();
  }

  @Patch('/:uuid')
  async updateSingleNote() {
    return this.notesService.updateSingleNote();
  }

  @Delete('/:uuid')
  async deleteSingleNote() {
    return this.notesService.deleteSingleNote();
  }
}
