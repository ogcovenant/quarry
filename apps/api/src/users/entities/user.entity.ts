import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

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
}
