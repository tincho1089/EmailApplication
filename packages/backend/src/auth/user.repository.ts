import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../base.repository';
import { Auth, AuthDocument } from './schemas/auth.schema';

@Injectable()
export class AuthRepository implements BaseRepository<any> {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,
  ) {}

  async findAll(): Promise<AuthDocument[]> {
    try {
      return this.authModel.find().exec();
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async findOne(id: string): Promise<AuthDocument> {
    return this.authModel.findById(id);
  }

  async findByName(username: string) {
    try {
      const user = await this.authModel.findOne({ username }).exec();
      this.logger.log('Auth info fetched successfully');
      return user;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
