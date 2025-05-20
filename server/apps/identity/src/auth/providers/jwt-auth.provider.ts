import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthProvider, AuthProviderOptions, TokenPayload, TokenResponse } from '../interfaces/auth-provider.interface';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@app/prisma';
import { Account } from '@prisma/client';


@Injectable()
export class JwtAuthProvider implements AuthProvider {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private options: AuthProviderOptions,
    ) { }

    async validateUser(email: string, password: string): Promise<Account> {
        const account = await this.prisma.account.findUnique({
            where: {
                email,
            },
            include: {
                user: true,
            },
        });

        if (!account) {
            throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ');
        }

        const isPasswordValid = await bcrypt.compare(password, account.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ');
        }

        return account;
        // return {
        //     id: account.id,
        //     userId: account.userId,
        //     email: account.email,
        //     tenantId: account.tenantId,
        //     role: account.user.role,
        // };
    }

    async login(user: any): Promise<TokenResponse> {
        const payload: TokenPayload = {
            sub: user.id,
            email: user.email,
            tenantId: user.tenantId,
            role: user.role,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.options.jwtSecret,
                expiresIn: this.options.jwtExpiresIn || '15m',
            }),
            this.jwtService.signAsync(
                { ...payload, type: 'refresh' },
                {
                    secret: this.options.jwtSecret,
                    expiresIn: this.options.refreshTokenExpiresIn || '7d',
                },
            ),
        ]);

        // Lưu refresh token vào database
        await this.prisma.account.update({
            where: { id: user.id },
            data: {
                refreshToken,
                lastLoginAt: new Date(),
            },
        });

        return {
            accessToken,
            refreshToken,
            expiresIn: 900, // 15 phút
            tokenType: 'Bearer',
        };
    }

    async refreshToken(token: string): Promise<TokenResponse> {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.options.jwtSecret,
            });

            if (payload.type !== 'refresh') {
                throw new UnauthorizedException('Token không hợp lệ');
            }

            const account = await this.prisma.account.findUnique({
                where: { id: payload.sub },
                include: { user: true },
            });

            if (!account || account.refreshToken !== token) {
                throw new UnauthorizedException('Token không hợp lệ');
            }

            return this.login({
                id: account.id,
                userId: account.userId,
                email: account.email,
                tenantId: account.tenantId,
                role: account.user.role,
            });
        } catch (error) {
            throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
        }
    }

    async verifyToken(token: string): Promise<TokenPayload> {
        try {
            return await this.jwtService.verifyAsync(token, {
                secret: this.options.jwtSecret,
            });
        } catch (error) {
            throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
        }
    }

    async revokeToken(token: string): Promise<boolean> {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.options.jwtSecret,
            });

            await this.prisma.account.update({
                where: { id: payload.sub },
                data: { refreshToken: null },
            });

            return true;
        } catch {
            return false;
        }
    }
}