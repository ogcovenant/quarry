import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type AuthenticatedUser } from 'src/auth/interfaces/authenticated-user.interface';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

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
  async getAllNotes(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: PaginationQueryDto,
  ) {
    return this.notesService.getAllNotes(user.id, query);
  }

  @Get('/:uuid')
  async getSingleNote(
    @Param('uuid') notesUuid: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.notesService.getSingleNote(notesUuid, user.id);
  }

  @Patch('/:uuid')
  async updateSingleNote(
    @Param('uuid') noteUUid: string,
    @Body() body: UpdateNoteDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.notesService.updateSingleNote(noteUUid, body, user.id);
  }

  @Delete('/:uuid')
  async deleteSingleNote(
    @Param('uuid') projectUuid: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.notesService.deleteSingleNote(projectUuid, user.id);
  }
}
