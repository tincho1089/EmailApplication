import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.midleware';
import { EmailModule } from './email/email.module';
import { EventGateway } from './event/event.gateway';
const dbContext = process.argv[2] == 'mongodb' ? 'mongodb' : 'localhost';
console.log(process.argv);
@Module({
  imports: [
    EmailModule,
    AuthModule,
    MongooseModule.forRoot(`mongodb://${dbContext}:27017/test`),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync<any>({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: configService.get('REDIS_DEFAULT_TTL'),
      }),
    }),
  ],
  controllers: [],
  providers: [EventGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('email');
  }
}
