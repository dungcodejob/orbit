import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule, PrismaService } from '@app/prisma';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthProvider } from './providers/jwt-auth.provider';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AUTH_PROVIDER',
      useFactory: (jwtService: JwtService, prisma: PrismaService, configService: ConfigService) => {
        return new JwtAuthProvider(prisma, jwtService, {
          jwtSecret: configService.get('JWT_SECRET'),
          jwtExpiresIn: configService.get('JWT_EXPIRES_IN') || '15m',
          refreshTokenExpiresIn: configService.get('REFRESH_TOKEN_EXPIRES_IN') || '7d',
        });
      },
      inject: [JwtService, PrismaService, ConfigService],
    },
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}