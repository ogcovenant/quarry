import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Projects } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import type { ProjectResponse } from './interfaces/project-response.interface';
import type { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import type { PaginatedResponse } from '../common/pagination/interfaces/paginated-response.interface';
import { createPaginatedResponse } from '../common/pagination/utils/create-paginated-response';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectRepository: Repository<Projects>,
  ) {}

  async createProject(
    body: CreateProjectDto,
    user: AuthenticatedUser,
  ): Promise<ProjectResponse> {
    const name = body.name.trim();

    const savedProject = await this.projectRepository.manager.transaction(
      async (manager) => {
        // Serialize project creation per user so concurrent requests cannot
        // both pass the duplicate-name check.
        await manager.query('SELECT pg_advisory_xact_lock($1)', [user.id]);

        const projectRepository = manager.getRepository(Projects);
        const existingProject = await projectRepository.findOne({
          where: {
            name,
            user: {
              id: user.id,
            },
          },
        });

        if (existingProject) {
          throw new ConflictException(
            `A project named "${name}" already exists`,
          );
        }

        const project = projectRepository.create({
          name,
          description: body.description ?? null,
          user: { id: user.id },
        });

        return projectRepository.save(project);
      },
    );

    return this.toProjectResponse(savedProject);
  }

  async getAllProjects(
    userId: number,
    query: PaginationQueryDto,
  ): Promise<PaginatedResponse<ProjectResponse>> {
    const { page, limit } = query;
    const [projects, total] = await this.projectRepository.findAndCount({
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

    return createPaginatedResponse(
      projects.map((project) => this.toProjectResponse(project)),
      total,
      query,
    );
  }

  async getSingleProject(projectUUid: string, userId: number) {
    return this.projectRepository.findOne({
      where: {
        uuid: projectUUid,
        user: {
          id: userId,
        },
      },
    });
  }

  async updateSingleProject(
    projectUuid: string,
    body: UpdateProjectDto,
    userId: number,
  ): Promise<ProjectResponse> {
    const updatedProject = await this.projectRepository.manager.transaction(
      async (manager) => {
        await manager.query('SELECT pg_advisory_xact_lock($1)', [userId]);

        const projectRepository = manager.getRepository(Projects);
        const project = await projectRepository.findOne({
          where: {
            uuid: projectUuid,
            user: {
              id: userId,
            },
          },
        });

        if (!project) {
          throw new NotFoundException('Project not found');
        }

        if (body.name !== undefined) {
          const name = body.name.trim();
          const projectWithName = await projectRepository.findOne({
            where: {
              name,
              user: {
                id: userId,
              },
            },
          });

          if (projectWithName && projectWithName.id !== project.id) {
            throw new ConflictException(
              `A project named "${name}" already exists`,
            );
          }

          project.name = name;
        }

        if (body.description !== undefined) {
          project.description = body.description;
        }

        return projectRepository.save(project);
      },
    );

    return this.toProjectResponse(updatedProject);
  }

  async deleteProject(
    projectUuid: string,
    userId: number,
  ): Promise<{ message: string }> {
    const result = await this.projectRepository.delete({
      uuid: projectUuid,
      user: {
        id: userId,
      },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }

    return { message: 'Project deleted successfully' };
  }

  private toProjectResponse(project: Projects): ProjectResponse {
    return {
      id: project.id,
      uuid: project.uuid,
      name: project.name,
      description: project.description,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
