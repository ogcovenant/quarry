import { ConfigService } from '@nestjs/config';

export function getJwtSecret(configService: ConfigService): string {
  const secret = configService.get<string>('JWT_SECRET');
  const nodeEnv = configService.get<string>('NODE_ENV');

  if (!secret && nodeEnv === 'production') {
    throw new Error('JWT_SECRET is required in production');
  }

  return secret ?? 'development-jwt-secret';
}
