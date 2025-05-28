import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@app/prisma';
import { TokenPayload } from '../interfaces/auth-provider.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'jwt_secret',
    });
  }

  async validate(payload: TokenPayload) {
    const account = await this.prisma.account.findUnique({
      where: { id: payload.sub },
      include: { user: true },
    });

    if (!account || !account.isActive) {
      throw new UnauthorizedException();
    }

    return {
      id: account.id,
      userId: account.userId,
      email: account.email,
      tenantId: account.tenantId,
      role: account.user.role,
    };
  }
}