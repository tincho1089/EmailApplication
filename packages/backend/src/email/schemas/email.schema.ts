import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailDocument = HydratedDocument<Email>;

@Schema()
export class Email {
  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  subject: string;

  @Prop()
  body: string;

  @Prop()
  date: Date;

  @Prop()
  state: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
