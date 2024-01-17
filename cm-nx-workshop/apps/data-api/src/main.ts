import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ApiResponseInterceptor } from '@cm-nx-workshop/backend/dto';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // const corsOptions: CorsOptions = {
  //   origin: 'https://red-pond-037f95f03.4.azurestaticapps.net',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Accept, Authorization',
  //   credentials: true,
  // };
  // app.enableCors(corsOptions);
  const corsOptions: CorsOptions = {};
  console.log('Enabling CORS with options:', corsOptions);
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
