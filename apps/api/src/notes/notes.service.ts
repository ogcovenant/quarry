import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from './entities/note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { User } from 'src/users/entities/user.entity';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { createPaginatedResponse } from 'src/common/pagination/utils/create-paginated-response';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
    private readonly projectsService: ProjectsService,
  ) {}

  async createNote(body: CreateNoteDto, userId: number) {
    const { title, content, projectUuid } = body;

    const project = await this.projectsService.getSingleProject(
      projectUuid,
      userId,
    );

    if (!project) {
      throw new BadRequestException('Invalid project selection');
    }

    const note = new Notes();

    note.title = title || 'New Note';
    note.content = content || null;
    note.project = project;
    note.user = { id: userId } as User;

    const { project: _, ...savedNote } = await this.notesRepository.save(note);

    return {
      ...savedNote,
      project: {
        id: project.id,
        uuid: project.uuid,
        name: project.name,
      },
    };
  }

  async getAllNotes(userId: number, query: PaginationQueryDto) {
    const { page, limit } = query;

    const [notes, total] = await this.notesRepository.findAndCount({
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return createPaginatedResponse(notes, total, query);
  }

  async getSingleNote(notesUuid: string, userId: number) {
    const note = await this.notesRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        uuid: notesUuid,
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async updateSingleNote(
    noteUuid: string,
    body: UpdateNoteDto,
    userId: number,
  ) {
    const { content, title } = body;

    const note = await this.notesRepository.findOne({
      where: {
        uuid: noteUuid,
        user: { id: userId },
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    if (title !== undefined) {
      note.title = title;
    }

    if (content !== undefined) {
      note.content = content;
    }

    return this.notesRepository.save(note);
  }

  async deleteSingleNote(noteUUid: string, userId: number) {
    const note = await this.notesRepository.findOne({
      where: {
        uuid: noteUUid,
        user: {
          id: userId,
        },
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    await this.notesRepository.delete({
      id: note.id,
    });

    return {
      message: 'Note deleted successfully',
    };
  }

  async fetchNotesByProject(
    projectUUid: string,
    userId: number,
    paginationQuery: PaginationQueryDto,
  ) {
    const { page, limit } = paginationQuery;

    const [notes, total] = await this.notesRepository.findAndCount({
      where: {
        project: {
          uuid: projectUUid,
        },
        user: {
          id: userId,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        uuid: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return createPaginatedResponse(notes, total, paginationQuery);
  }
}
