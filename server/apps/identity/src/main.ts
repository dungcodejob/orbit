import { NestFactory } from '@nestjs/core';
import { IdentityModule } from './identity.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(IdentityModule);
  await app.listen(port);

  console.log(`Server in ${process.env.NODE_ENV} mode`);
}
bootstrap();
