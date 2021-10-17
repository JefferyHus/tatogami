import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // include global filters
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  // start the application
  await app.listen(process.env.PORT);
}
bootstrap();
