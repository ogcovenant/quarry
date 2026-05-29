import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: configService.get('NODE_ENV') === 'development' ? true : false,
  }),
  inject: [ConfigService],
});
