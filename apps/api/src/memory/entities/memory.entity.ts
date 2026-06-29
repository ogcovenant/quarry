import { Notes } from 'src/notes/entities/note.entity';
import { Projects } from 'src/projects/entities/project.entity';
import { Source } from 'src/source/entities/source.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('memory')
export class Memory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', generated: 'uuid', unique: true })
  uuid!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'vector', length: 1536 })
  embeddings!: number[];

  @Column({ name: 'memory_type', type: 'text' })
  memoryType!: 'source' | 'note';

  @Column({ name: 'chunk_index', type: 'integer' })
  chunkIndex!: number;

  @Column({ name: 'content_version', type: 'text', nullable: true })
  contentVersion!: string | null;

  @Column({ name: 'source_id', type: 'integer', nullable: true })
  sourceId!: number | null;

  @ManyToOne(() => Source, (source) => source.memories, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'source_id' })
  source?: Source;

  @Column({ name: 'note_id', type: 'integer', nullable: true })
  noteId!: number | null;

  @ManyToOne(() => Notes, (note) => note.memories, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'note_id' })
  note?: Notes;

  @Column({ name: 'project_id', type: 'integer', nullable: true })
  projectId!: number | null;

  @ManyToOne(() => Projects, (project) => project.memories, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project?: Projects;

  @Column({ name: 'user_id', type: 'integer' })
  userId!: number;

  @ManyToOne(() => User, (user) => user.memories, {
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
