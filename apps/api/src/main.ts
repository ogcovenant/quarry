import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { Logger as PinoLogger } from 'nestjs-pino';

export let appInstance: INestApplication;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  appInstance = app;

  app.useLogger(app.get(PinoLogger));

  const logger = new Logger('Bootstrap');

  app.use(helmet());
  app.enableCors({ origin: process.env.ALLOWED_ORIGINS?.split(',') });

  app.use(compression());

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const port = process.env.PORT ?? 7890;
  await app.listen(port);
  logger.log(`Server is running on port ${port}`);
}
void bootstrap();
