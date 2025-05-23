import { Module } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { ConfigModule } from '@nestjs/config';

import { appConfig, jwtConfig } from '../configs';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `./${process.env.NODE_ENV}.env`,
    load: [jwtConfig, appConfig],
  }),
    AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class IdentityModule { }
