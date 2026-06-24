import { Notes } from 'src/notes/entities/note.entity';
import { Source } from 'src/source/entities/source.entity';
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

  @ManyToOne(() => Source, (source) => source.memories, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'source_id' })
  source?: Source;

  @ManyToOne(() => Notes, (note) => note.memories, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'note_id' })
  note?: Notes;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
