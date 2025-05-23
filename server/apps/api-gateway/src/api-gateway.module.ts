import { Module } from '@nestjs/common';

import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_TOKENS } from '@app/constants';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: SERVICE_TOKENS.IDENTITY,
    //     transport: Transport.TCP,
    //     options: {
    //       host: process.env.IDENTITY_SERVICE_HOST || 'localhost',
    //       port: process.env.IDENTITY_SERVICE_PORT ? parseInt(process.env.IDENTITY_SERVICE_PORT) : 3001,
    //     },
    //   },
    //   {
    //     name: SERVICE_TOKENS.PRODUCT,
    //     transport: Transport.TCP,
    //     options: {
    //       host: process.env.PRODUCT_SERVICE_HOST || 'localhost',
    //       port: process.env.PRODUCT_SERVICE_PORT ? parseInt(process.env.PRODUCT_SERVICE_PORT) : 3002,
    //     },
    //   },
    //   {
    //     name: SERVICE_TOKENS.ORDER,
    //     transport: Transport.TCP,
    //     options: {
    //       host: process.env.ORDER_SERVICE_HOST || 'localhost',
    //       port: process.env.ORDER_SERVICE_PORT ? parseInt(process.env.ORDER_SERVICE_PORT) : 3003,
    //     },
    //   },
    // ]),
    AuthModule
  ],
  controllers: [],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule { }
