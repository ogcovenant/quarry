import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: AuthDto) {
    const { email, password } = body;
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.userService.hashPassword(password);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    const savedUser = await this.userService.create(user);

    return {
      message: 'User registered successfully',
      accessToken: this.signToken(savedUser),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | null> {
    const existingUser = await this.userService.findOneByEmailWithPassword(
      email.toLowerCase().trim(),
    );
    if (!existingUser) {
      return null;
    }

    const isPasswordValid = await this.userService.comparePassword(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return null;
    }

    return this.toAuthenticatedUser(existingUser);
  }

  login(user: AuthenticatedUser) {
    return {
      message: 'Login successful',
      accessToken: this.signToken(user),
    };
  }

  private signToken(user: Pick<User, 'id' | 'email'>): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  }

  private toAuthenticatedUser(
    user: Pick<User, 'id' | 'uuid' | 'email'>,
  ): AuthenticatedUser {
    return {
      id: user.id,
      uuid: user.uuid,
      email: user.email,
    };
  }
}
