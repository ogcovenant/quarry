import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { AppModuleConfig } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ProjectsModule } from './projects/projects.module';
import { NotesModule } from './notes/notes.module';
import { SourceModule } from './source/source.module';
import { MemoryModule } from './memory/memory.module';

@Module({
  imports: [
    AppModuleConfig,
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    NotesModule,
    SourceModule,
    MemoryModule,
  ],
  controllers: [AppController],
  providers: [{ provide: 'APP_GUARD', useClass: ThrottlerGuard }, AppService],
})
export class AppModule {}
