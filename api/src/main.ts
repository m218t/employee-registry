import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    // forbidNonWhitelisted: true,
  }));

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
  console.log('✅ Сервер запущен: http://localhost:3000');
  console.log('📊 API: http://localhost:3000/api/employees');
}
bootstrap();