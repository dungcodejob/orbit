import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule, PrismaService } from '@app/prisma';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthProvider } from './providers/jwt-auth.provider';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountService, BcryptService, JwtTokenService, TenantService } from './services';

import { UserModule } from '../user/user.module';
import { TenantModule } from '../tenant/tenant.module';


@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule,
    UserModule,
    TenantModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccountService,
    JwtTokenService,
    BcryptService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule { }