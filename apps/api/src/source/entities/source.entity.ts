import { Projects } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('source')
export class Source {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'text', nullable: false })
  storageKey!: string;

  @Column({ type: 'text', nullable: false })
  filename!: string;

  @Column({ type: 'text', nullable: false })
  mimeType!: string;

  @ManyToOne(() => Projects, (project) => project.sources, {
    nullable: true,
  })
  @JoinColumn({ name: 'project_id' })
  project!: Projects;

  @ManyToOne(() => User, (user) => user.sources, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
