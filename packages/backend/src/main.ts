import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Vertrical Challenge')
    .setDescription('The Vertrical API Description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('email')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(port);
}
bootstrap();
