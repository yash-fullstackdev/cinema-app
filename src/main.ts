import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from '@shared/prisma-client-exception/prisma-client-exception.filter';
import { createDocument } from '@shared/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get the singleton instance of the configuration service
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // The ClassSerializerInterceptor uses the class-transformer package to define how to transform objects. Use the @Exclude() decorator to exclude the password field in the UserEntity class:
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // get PORT environment variable
  const PORT = configService.get('PORT');

  // enable cors -> Allow for all (*) on development
  app.enableCors({
    origin:
      configService.get('NODE_ENV') === 'dev'
        ? '*'
        : configService.get('APP_ORIGIN'),
  });

  // Swagger module
  SwaggerModule.setup('/apis/docs', app, createDocument(app));

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(PORT);

  // the app run successfully, log that out to the console
  Logger.log(`Server started running on port ${PORT}`);
}
bootstrap();
