import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { AuthProvider } from './interfaces/auth-provider.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_PROVIDER') private authProvider: AuthProvider,
    private prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.authProvider.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authProvider.login(user);
  }

  async register(registerDto: RegisterDto) {
    // Kiểm tra tenant tồn tại
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: registerDto.tenantId },
    });

    if (!tenant) {
      throw new UnauthorizedException('Tenant không tồn tại');
    }

    // Kiểm tra email đã tồn tại trong tenant
    const existingAccount = await this.prisma.account.findUnique({
      where: {
        tenantId_email: {
          tenantId: registerDto.tenantId,
          email: registerDto.email,
        },
      },
    });

    if (existingAccount) {
      throw new UnauthorizedException('Email đã tồn tại trong tenant này');
    }

    // Tạo user mới
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    // Tạo user và account trong một transaction
    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: registerDto.email,
          password: hashedPassword, // Lưu ý: Trong thực tế, không nên lưu password ở bảng User
          name: registerDto.name,
        },
      });

      const account = await tx.account.create({
        data: {
          userId: user.id,
          tenantId: registerDto.tenantId,
          provider: 'local',
          email: registerDto.email,
          passwordHash: hashedPassword,
        },
      });

      return { user, account };
    });

    // Login sau khi đăng ký
    return this.authProvider.login({
      id: result.account.id,
      userId: result.user.id,
      email: result.user.email,
      tenantId: registerDto.tenantId,
      role: result.user.role,
    });
  }

  async refreshToken(token: string) {
    return this.authProvider.refreshToken(token);
  }

  async logout(token: string) {
    return this.authProvider.revokeToken(token);
  }

  async validateToken(token: string) {
    return this.authProvider.verifyToken(token);
  }
}