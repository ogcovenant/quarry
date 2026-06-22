import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Projects } from './entities/project.entity';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Projects]),
    AuthModule,
    forwardRef(() => NotesModule),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
