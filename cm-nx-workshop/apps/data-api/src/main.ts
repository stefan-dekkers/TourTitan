/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ApiResponseInterceptor } from '@cm-nx-workshop/backend/dto';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const corsOptions: CorsOptions = {};
  app.enableCors(corsOptions);
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   transform: true,
  //   exceptionFactory: (errors) => {
  //     const errorMessages = errors.map(error => {
  //       const constraints = error.constraints ? Object.values(error.constraints).join('. ') : 'Onbekende validatiefout';
  //       return {
  //         property: error.property,
  //         constraints: constraints
  //       };
  //     });
  //     return new BadRequestException(errorMessages);
  //   }
  // }));
  const config = new DocumentBuilder()
    .setTitle('TourTitans Backend API')
    .setDescription('The TourTitan API description')
    .setVersion('1.0')
    .addTag('TourTitan')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
