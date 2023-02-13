import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { EmailService } from './email.service';

@ApiBearerAuth()
@ApiTags('email')
@Controller('email')
@UseGuards(JwtAuthGuard)
export class EmailController {
  private readonly logger = new Logger();

  constructor(private readonly emailService: EmailService) {}

  @Post('/create')
  create(@Body() createEmailDto: CreateEmailDto, @Request() req: any) {
    try {
      return this.emailService.create(createEmailDto, req.user.username);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get('all')
  async findById(@Request() req: any) {
    try {
      const user = await this.emailService.findEmails(req);
      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.emailService.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Put(':id/update')
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    try {
      return this.emailService.update(id, updateEmailDto);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
