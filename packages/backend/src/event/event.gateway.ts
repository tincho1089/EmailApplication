import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Email } from '../email/entities/email.entity';

@WebSocketGateway(8001, { cors: '*' })
export class EventGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() newEmail: Email): Promise<void> {
    /*const emailCreated = await this.emailService.create(
      newEmail,
      newEmail.from,
    );*/
    this.server.emit(`message${newEmail.to}`, newEmail);
  }
}
