import { AccountModule } from '@app/account';
import { TenantModule } from '@app/tenant';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BacklistService, BcryptService, JwtTokenService } from './services';
import { ConfigModule } from '@nestjs/config';
import { ConfigsModule } from '@app/configs';
import { jwtConfig } from '../jwt.config';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule,
    AccountModule,
    TenantModule,
    ConfigsModule,

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService,BacklistService, BcryptService],
  exports: [AuthService],
})
export class AuthModule {}
