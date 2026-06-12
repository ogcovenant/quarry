import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { AuthenticatedUser } from './interfaces/authenticated-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: AuthDto) {
    return this.authService.register(body);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@CurrentUser() user: AuthenticatedUser) {
    return this.authService.login(user);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }
}
