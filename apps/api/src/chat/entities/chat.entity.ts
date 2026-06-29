import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CHAT_ROLE } from '../chat.interface';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', generated: 'uuid', unique: true })
  uuid!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'enum', enum: CHAT_ROLE })
  role!: CHAT_ROLE;

  @OneToMany(() => Message, (message) => message.chat)
  messages!: Message[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', generated: 'uuid', unique: true })
  uuid!: string;

  @Column({ type: 'text' })
  content!: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat!: Chat;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
