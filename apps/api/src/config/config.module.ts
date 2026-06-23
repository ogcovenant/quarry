import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

export const AppModuleConfig = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: joi.object({
    PORT: joi.number().default(7890),
    NODE_ENV: joi.string().default('development'),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),
    JWT_SECRET: joi.string().optional(),
    CLOUDFLARE_ACCOUNT_ID: joi.string().required(),
    CLOUDFLARE_R2_ACCESS_KEY_ID: joi.string().required(),
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: joi.string().required(),
    CLOUDFLARE_BUCKET_NAME: joi.string().required(),
  }),
});
