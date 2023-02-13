import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { AuthRepository } from './user.repository';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Auth, AuthDocument } from './schemas/auth.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,
    private jwtAuthService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async register(userObject: RegisterAuthDto): Promise<AuthDocument> {
    try {
      const userDb = await this.authRepository.findByName(userObject.username);
      if (userDb) {
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
      }

      const { password } = userObject;
      const plainToHash = await hash(password!, 10);
      userObject = { ...userObject, password: plainToHash };

      const user = new this.authModel(userObject);
      this.logger.log('User created successfully');
      return user.save();
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async login(
    userObjectLogin: LoginAuthDto,
  ): Promise<{ jwtToken: string; status: number }> {
    try {
      const { username, password } = userObjectLogin;
      const userDb = await this.authRepository.findByName(username);

      if (!userDb) throw new HttpException('USERNAME_INCORRECT', 403);

      const isMatch = await compare(password, userDb.password);
      if (!isMatch) throw new HttpException('PASSWORD_INCORRECT', 403);

      const payload = {
        username: userDb.username,
        sub: userDb.id,
      };

      const token = this.jwtAuthService.sign(payload);
      this.logger.log('User Logged in successfully');
      return { jwtToken: token, status: 200 };
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
