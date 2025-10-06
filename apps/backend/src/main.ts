import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // CORS frontend from Vercel
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'https://your-frontend.vercel.app',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // setup Swagger
  setupSwagger(app);

  //
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Backend running on port ${port}`);
  console.log(`🌐 Swagger: http://localhost:${port}/api/docs`);
}
bootstrap();
