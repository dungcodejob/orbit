import { Injectable } from "@nestjs/common";

import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { InjectJwtConfig, JwtConfig } from "apps/identity/configs/jwt.config";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { IAccessPayload, IAccessToken, IEmailPayload, IEmailToken, IRefreshPayload, IRefreshToken } from "../interfaces";
import { AppConfig, InjectAppConfig } from "apps/identity/configs";
import { Account, User } from "@prisma/client";
import { v6 } from 'uuid';



@Injectable()
export class JwtTokenService {

    private readonly issuer: string;

    constructor(
        @InjectJwtConfig() private readonly jwtConfig: JwtConfig,
        @InjectAppConfig() private readonly appConfig: AppConfig,
        private readonly jwtService: JwtService,
    ) {
        this.issuer = appConfig.appId;
    }


    generateAccessToken(
        account: Account,
        domain?: string | null,
        tokenId?: string): Promise<string> {

        const { secret, time } = this.jwtConfig[TokenTypeEnum.ACCESS];

        const jwtOptions: JwtSignOptions = {
            issuer: this.issuer,
            subject: account.email,
            audience: domain ?? this.appConfig.domain,
            algorithm: 'HS256', // only needs a secret
            expiresIn: time,
        };

        const payload: IAccessPayload = {
            id: account.id,
            email: account.email,
            tenantId: account.tenantId,
        }


        return this.generateToken(payload, secret, jwtOptions);
    }


    generateRefreshToken(account: Account,
        domain?: string | null, tokenId?: string): Promise<string> {
        const { secret, time } = this.jwtConfig[TokenTypeEnum.REFRESH];

        const jwtOptions: JwtSignOptions = {
            issuer: this.issuer,
            subject: account.email,
            audience: domain ?? this.appConfig.domain,
            algorithm: 'HS256', // only needs a secret
            expiresIn: time,
        };

        const payload: IRefreshPayload = {
            id: account.id,
            email: account.email,
            tenantId: account.tenantId,
            tokenId: tokenId ?? v6(),
            version: account.version
        }

        return this.generateToken(payload, secret, jwtOptions);
    }


    generateConfirmToken(account: Account,
        domain?: string | null, tokenId?: string): Promise<string> {
        const { secret, time } = this.jwtConfig[TokenTypeEnum.CONFIRMATION];

        const jwtOptions: JwtSignOptions = {
            issuer: this.issuer,
            subject: account.email,
            audience: domain ?? this.appConfig.domain,
            algorithm: 'HS256', // only needs a secret
            expiresIn: time,
        };

        const payload: IEmailPayload = {
            id: account.id,
            email: account.email,
            tenantId: account.tenantId,
            version: account.version
        }

        return this.generateToken(payload, secret, jwtOptions);
    }

    generateResetPasswordToken(account: Account,
        domain?: string | null, tokenId?: string): Promise<string> {
        const { secret, time } = this.jwtConfig[TokenTypeEnum.RESET_PASSWORD];

        const jwtOptions: JwtSignOptions = {
            issuer: this.issuer,
            subject: account.email,
            audience: domain ?? this.appConfig.domain,
            algorithm: 'HS256', // only needs a secret
            expiresIn: time,
        };

        const payload: IEmailPayload = {
            id: account.id,
            email: account.email,
            tenantId: account.tenantId,
            version: account.version
        }

        return this.generateToken(payload, secret, jwtOptions);
    }

    async verifyToken(token: string, tokenType: TokenTypeEnum.ACCESS): Promise<IAccessToken>;
    async verifyToken(token: string, tokenType: TokenTypeEnum.REFRESH): Promise<IRefreshToken>;
    async verifyToken(token: string, tokenType: TokenTypeEnum.CONFIRMATION): Promise<IEmailToken>;
    async verifyToken(token: string, tokenType: TokenTypeEnum.RESET_PASSWORD): Promise<IEmailToken>;
    async verifyToken<T extends IAccessToken | IRefreshToken | IEmailToken>(token: string, tokenType: TokenTypeEnum): Promise<T> {
        const { time, secret } = this.jwtConfig[tokenType];
        const jwtOptions: JwtVerifyOptions = {
            issuer: this.issuer,
            audience: new RegExp(this.appConfig.domain),
            secret,
            maxAge: time,
        };


        return this.jwtService.verifyAsync<T>(token, jwtOptions);

    }

    private generateToken(payload: IAccessPayload | IEmailPayload | IRefreshPayload,
        secret: string,
        options: JwtSignOptions): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret,
            ...options,
        })
    }
}