import { Notes } from 'src/notes/entities/note.entity';
import { Projects } from '../../projects/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Source } from 'src/source/entities/source.entity';
import { Memory } from 'src/memory/entities/memory.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @OneToMany(() => Projects, (project) => project.user)
  projects!: Projects[];

  @OneToMany(() => Notes, (note) => note.user)
  notes!: Notes[];

  @OneToMany(() => Source, (source) => source.user)
  sources!: Source[];

  @OneToMany(() => Memory, (memory) => memory.user)
  memories!: Memory[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
