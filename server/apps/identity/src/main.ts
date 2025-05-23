import { NestFactory } from '@nestjs/core';
import { IdentityModule } from './identity.module';
import { Logger } from '@nestjs/common';
import { appConfig, AppConfig } from '../configs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {


  const logger = new Logger('Bootstrap');

  const globalPrefix = "api";
 
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(IdentityModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    },
  });

  const config = app.get<AppConfig>(appConfig.KEY);



  await app.listen();


  console.log(`Server in ${process.env.NODE_ENV} mode`);
  console.log(`Server is listening on :${config.port}/${globalPrefix}`);
  console.log(`Swagger: ${config.domain}/${globalPrefix}/docs`);
}
bootstrap();
