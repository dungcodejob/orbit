import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  // Cấu hình CORS cho API Gateway
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  // Cấu hình global prefix cho API
  app.setGlobalPrefix('api');
  
  // Connect to microservices
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3002,
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3003,
    },
  });

  // Start all microservices
  await app.startAllMicroservices();
  logger.log('Tất cả microservices đã được khởi động');
  
  // Start HTTP application
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`API Gateway đang chạy trên cổng ${port}`);
}
bootstrap();
