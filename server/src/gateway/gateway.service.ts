import { Injectable } from '@nestjs/common';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayService implements OnModuleInit {
  constructor(
    @Inject('IDENTITY_SERVICE') private readonly identityService: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy,
    @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy,
  ) {}

  async onModuleInit() {
    // Kết nối đến các microservice khi khởi động
    await Promise.all([
      this.identityService.connect(),
      this.productService.connect(),
      this.orderService.connect(),
    ]);
    console.log('Gateway Service đã kết nối đến tất cả microservices');
  }

  // Các phương thức tiện ích cho API Gateway
  async checkServiceHealth() {
    return {
      identity: await this.pingService(this.identityService, 'identity_health'),
      product: await this.pingService(this.productService, 'product_health'),
      order: await this.pingService(this.orderService, 'order_health'),
    };
  }

  private async pingService(service: ClientProxy, pattern: string) {
    try {
      await service.send({ cmd: pattern }, {}).toPromise();
      return 'online';
    } catch (error) {
      return 'offline';
    }
  }
}