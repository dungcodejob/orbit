import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { PrismaService } from '@app/prisma';
import { ConfigModule } from '@nestjs/config';
import { authConfig } from '../configs/auth.config';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `./${process.env.NODE_ENV}.env`,
    load: [authConfig],
  }),],
  controllers: [IdentityController],
  providers: [IdentityService, PrismaService],
})
export class IdentityModule { }
