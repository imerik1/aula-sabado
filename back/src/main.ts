import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: '*',
    }),
  );

  await app.listen(8080);
};

bootstrap();
