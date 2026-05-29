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
    GEMINI_API_KEY: joi.string().required(),
  }),
});
