import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { Email, EmailSchema } from './schemas/email.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Email.name,
        schema: EmailSchema,
      },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SEED'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
