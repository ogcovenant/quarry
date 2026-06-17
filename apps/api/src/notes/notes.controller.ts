import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type AuthenticatedUser } from 'src/auth/interfaces/authenticated-user.interface';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('/')
  async createNote(
    @Body() body: CreateNoteDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.notesService.createNote(body, user.id);
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
