import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger')
    .setDescription(
      'API feita por Leo ',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('users')
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
