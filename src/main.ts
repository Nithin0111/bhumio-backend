import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  const port = 3001;

  await app.listen(port, () => {
    Logger.log(`Server started on port ${port}`);
  });
}
bootstrap();
