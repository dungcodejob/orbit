import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { IdentityGateway } from './identity.gateway';

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
    ]),
  ],
  controllers: [IdentityController],
  providers: [IdentityService, IdentityGateway],
  exports: [IdentityService, IdentityGateway],
})
export class IdentityModule {}
