import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { PrismaService } from '@app/prisma';


@Module({
  imports: [],
  controllers: [IdentityController],
  providers: [IdentityService, PrismaService],
})
export class IdentityModule {}
