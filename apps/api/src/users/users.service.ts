import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneByUuid(uuid: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { uuid } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    const user = await this.usersRepository.preload({
      id,
      ...data,
    });

    if (!user) {
      return null;
    }

    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
