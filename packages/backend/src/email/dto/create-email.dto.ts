import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Email } from '../entities/email.entity';

export class CreateEmailDto extends Email {
  from: string;

  @ApiProperty()
  @IsNotEmpty()
  to: string;

  @ApiProperty()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsNotEmpty()
  body: string;
}
