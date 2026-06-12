import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProjectsService } from './projects.service';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('/')
  async createProject() {}

  @Get('/')
  async getAllProjects() {}

  @Get('/:id')
  async getSingleProject() {}

  @Patch('/:id')
  async updateSingleProject() {}

  @Delete('/:id')
  async deleteSingleProject() {}
}
