import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { Email, EmailDocument } from './schemas/email.schema';

@Injectable()
export class EmailService {
  private readonly logger = new Logger();

  constructor(
    @InjectModel(Email.name)
    private readonly emailModel: Model<EmailDocument>,
  ) {}

  async create(
    createEmailDto: CreateEmailDto,
    username: string,
  ): Promise<EmailDocument> {
    createEmailDto.from = username;
    createEmailDto.state = 'unread';
    createEmailDto.date = new Date();
    const email = new this.emailModel(createEmailDto);
    return email.save();
  }

  async findAll(): Promise<EmailDocument[]> {
    return this.emailModel.find().exec();
  }

  async findOne(id: string) {
    return this.emailModel.findById(id);
  }

  async update(
    id: string,
    updateEmailDto: UpdateEmailDto,
  ): Promise<EmailDocument> {
    return this.emailModel.findByIdAndUpdate(id, updateEmailDto);
  }

  async remove(id: string) {
    return this.emailModel.findByIdAndRemove(id);
  }

  async findEmails(req: any) {
    try {
      if (req.query.type === 'Inbox' || req.query.type === 'Sent') {
        const type = req.query.type === 'Inbox' ? 'to' : 'from';
        const response = await this.emailModel.find({
          [type]: req.user.username,
          state: /read/i,
        });
        return response;
      } else {
        const response = await this.emailModel.find({
          to: req.user.username,
          state: /removed/i,
        });
        return response;
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
