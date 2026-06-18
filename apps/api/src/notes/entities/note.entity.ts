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

@Entity('notes')
export class Notes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid!: string;

  @Column({ type: 'text', default: 'New Project' })
  title!: string;

  @Column({ type: 'text', nullable: false, name: 'walrus_blob_id' })
  blobId!: string;

  @Column({ type: 'text', nullable: false, name: 'walrus_blob_object_id' })
  blobObjectId!: string;

  @Column({ type: 'timestamp', name: 'walrus_blob_expiry_date' })
  expiryDate!: Date;

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
