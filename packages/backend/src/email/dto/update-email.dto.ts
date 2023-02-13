import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailDto } from './create-email.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateEmailDto extends PartialType(CreateEmailDto) {
  @ApiProperty()
  @IsNotEmpty()
  state: string;
}
