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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { type AuthenticatedUser } from 'src/auth/interfaces/authenticated-user.interface';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { NotesService } from 'src/notes/notes.service';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectService: ProjectsService,
    private readonly notesService: NotesService,
  ) {}

  @Post('/')
  async createProject(
    @Body() body: CreateProjectDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.projectService.createProject(body, user);
  }

  @Get('/')
  async getAllProjects(
    @CurrentUser() user: AuthenticatedUser,
    @Query() query: PaginationQueryDto,
  ) {
    return this.projectService.getAllProjects(user.id, query);
  }

  @Get('/:uuid')
  async getSingleProject(
    @Param('uuid') uuid: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.projectService.getSingleProject(uuid, user.id);
  }

  @Patch('/:uuid')
  async updateSingleProject(
    @Param('uuid') uuid: string,
    @Body() body: UpdateProjectDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.projectService.updateSingleProject(uuid, body, user.id);
  }

  @Delete('/:uuid')
  async deleteSingleProject(
    @Param('uuid') uuid: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.projectService.deleteProject(uuid, user.id);
  }

  @Get('/:uuid/notes')
  async getNotesForProject(
    @Param('uuid') projectUuid: string,
    @CurrentUser() user: AuthenticatedUser,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.notesService.fetchNotesByProject(
      projectUuid,
      user.id,
      paginationQuery,
    );
  }
}
