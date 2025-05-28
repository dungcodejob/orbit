import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('health')
export class GatewayHealthController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  async checkHealth() {
    const serviceStatus = await this.gatewayService.checkServiceHealth();
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: serviceStatus,
      gateway: 'online'
    };
  }
}