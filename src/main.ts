import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import Enums from './utils/enums';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const swaggerDocumentOptions = new DocumentBuilder()
    .setTitle(Enums.SWAGGER_API_TITLE)
    .setDescription(Enums.SWAGGER_API_DESCRIPTION)
    .setVersion(Enums.SWAGGER_API_VERSION)
    .build();

  //initiate logger
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  //API Documentation
  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);
  SwaggerModule.setup(Enums.SWAGGER_API_ENDPOINT, app, document);

  //validate the correctness of incoming payloads
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}

bootstrap();
