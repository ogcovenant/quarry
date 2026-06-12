import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { getJwtSecret } from '../jwt-secret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getJwtSecret(configService),
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const userId = payload.sub ?? payload.id;
    if (!userId) {
      throw new UnauthorizedException('Invalid access token');
    }

    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid access token');
    }

    return {
      id: user.id,
      uuid: user.uuid,
      email: user.email,
    };
  }
}
