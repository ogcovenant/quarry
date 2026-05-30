import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

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

    const token = this.jwtService.sign({
      id: savedUser.id,
      email: savedUser.email,
    });

    return { message: 'User registered successfully', accessToken: token };
  }

  async login(body: AuthDto) {
    const { email, password } = body;

    const existingUser = await this.userService.findOneByEmail(email);
    if (!existingUser) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordValid = await this.userService.comparePassword(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      id: existingUser.id,
      email: existingUser.email,
    });

    return { message: 'Login successful', accessToken: token };
  }
}
