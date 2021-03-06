import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalConfig } from './config/global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(globalConfig.port);
}
bootstrap();


// FIRE