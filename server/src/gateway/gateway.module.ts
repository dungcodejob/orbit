import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayMiddleware } from './gateway.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { GatewayHealthController } from './gateway.health.controller';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'IDENTITY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3001,
        },
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3002,
        },
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [GatewayController, GatewayHealthController],
  providers: [GatewayService, GatewayMiddleware, AuthMiddleware],
  exports: [GatewayService],
})
export class GatewayModule {}