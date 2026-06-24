import { Memory } from 'src/memory/entities/memory.entity';
import { Projects } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notes')
export class Notes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'text', default: 'New Note' })
  title!: string;

  @Column({ type: 'text', nullable: true })
  content!: string | null;

  @ManyToMany(() => Memory, (memory) => memory.note)
  memories!: Memory[];

  @ManyToOne(() => Projects, (project) => project.notes, {
    nullable: true,
  })
  @JoinColumn({ name: 'project_id' })
  project!: Projects;

  @ManyToOne(() => User, (user) => user.notes, {
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
