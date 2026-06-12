import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Projects } from './entities/project.entity';
import { ProjectsService } from './projects.service';

describe('ProjectsService deleteProject', () => {
  const projectRepository = {
    delete: jest.fn(),
  };

  let projectsService: ProjectsService;

  beforeEach(() => {
    jest.resetAllMocks();
    projectsService = new ProjectsService(
      projectRepository as unknown as Repository<Projects>,
    );
  });

  it('deletes a project owned by the authenticated user', async () => {
    projectRepository.delete.mockResolvedValue({ affected: 1 });

    await expect(
      projectsService.deleteProject('project-uuid', 7),
    ).resolves.toEqual({
      message: 'Project deleted successfully',
    });

    expect(projectRepository.delete).toHaveBeenCalledWith({
      uuid: 'project-uuid',
      user: {
        id: 7,
      },
    });
  });

  it('returns not found for a missing or non-owned project', async () => {
    projectRepository.delete.mockResolvedValue({ affected: 0 });

    await expect(
      projectsService.deleteProject('project-uuid', 7),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
