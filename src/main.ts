import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //全局中间件，只能y引入函数式中间件。
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
