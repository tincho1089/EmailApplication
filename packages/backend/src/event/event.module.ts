import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from 'src/email/email.service';
import { Email } from 'src/email/entities/email.entity';
import { EmailSchema } from 'src/email/schemas/email.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Email.name,
        schema: EmailSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [EmailService],
})
export class EventModule {}
