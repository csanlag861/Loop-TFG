import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('App - Auth');

  const app = await NestFactory.create(AppModule);

  // app.use(helmet());
  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: envs.ALLOWED_ORIGINS,
    credentials: true, // Permite cookies
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(envs.PORT, '0.0.0.0');
  logger.log('App running on PORT:');
}

bootstrap();
