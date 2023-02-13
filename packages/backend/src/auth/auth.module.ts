import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SEED'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Auth.name,
        schema: AuthSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthRepository],
})
export class AuthModule {}
