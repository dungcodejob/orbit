import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [GatewayModule, IdentityModule, ProductModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
