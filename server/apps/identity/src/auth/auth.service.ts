import { BadRequestException, Injectable } from "@nestjs/common";

import { isEmail } from "class-validator";
import { SLUG_REGEX } from "@app/constants";
import { compare } from "bcrypt";

import { formatName, generatePointSlug, generateSlug } from "@app/utils";
import { UserService } from "../user/user.service";
import { LoginDto, RegisterDto } from "./dto";
import { IAuthResult } from "./interfaces";
import { TenantService, JwtTokenService, BcryptService, AccountService } from "./services";
import { PrismaService } from "@app/prisma";
import { RpcException } from "@nestjs/microservices";




@Injectable()
export class AuthService {

    constructor(
        private readonly accountService: AccountService,
        private readonly userService: UserService,
        private readonly tenantService: TenantService,
        private readonly jwtTokenService: JwtTokenService,
        private readonly bcryptService: BcryptService,
        private readonly prismaService: PrismaService
    ) { }


    async login(dto: LoginDto, domain?: string): Promise<IAuthResult
    > {
        const { emailOrUsername, password } = dto;
        const account = await this.getAccountByEmailOrUsername(emailOrUsername);

        if (!account) {
            // throw new BadRequestException('Invalid credentials');
            throw new RpcException({
                code: 400,
                message: 'Invalid credentials',
            })
        }

        const isMatchPassword = await compare(password, account.passwordHash);

        if (!isMatchPassword) {
            // throw new BadRequestException('Invalid credentials');
            throw new RpcException({
                code: 400,
                message: 'Invalid credentials',
            })
        }

        const accessToken = await this.jwtTokenService.generateAccessToken(account);
        const refreshToken = await this.jwtTokenService.generateRefreshToken(account);

        return {
            accessToken,
            refreshToken,
            user: account.user
        };
    }

    async register(dto: RegisterDto, domain?: string) {
        const { email, password, name } = dto;
        const isEmailExists = await this.checkEmailExists(email);

        if (isEmailExists) {
            
            // throw new BadRequestException('Email already exists');
            throw new RpcException({
                code: 400,
                message: 'Email already exists',
            })
        }

        const formattedName = formatName(name);
        const passwordHash = await this.bcryptService.hash(password);
        const username = await this.generateUsername(formattedName);



        const user = await this.userService.createUser({
            name,
        });

        const account = await this.accountService.create({
            email,
            passwordHash,
            username,
            user: {
                connect: {
                    id: user.id,
                },
            },
        });

        const tenant = await this.tenantService.create({
            name: formattedName,
            slug: generateSlug(formattedName),
            owner: {
                connect: {
                    id: account.id,
                },
            },
        });

    }

    private async getAccountByEmailOrUsername(emailOrUsername: string) {
        if (emailOrUsername.includes('@')) {
            if (!isEmail(emailOrUsername)) {
                throw new RpcException({
                    code: 400,
                    message: 'Invalid email',
                })
                // throw new BadRequestException('Invalid email');
            }

            return this.accountService.findOneByEmail(emailOrUsername);
        }

        if (
            emailOrUsername.length < 3 ||
            emailOrUsername.length > 106 ||
            !SLUG_REGEX.test(emailOrUsername)
        ) {
            throw new RpcException({
                code: 400,
                message: 'Invalid username',
            })
            // throw new BadRequestException('Invalid username');
        }

        return this.accountService.findOneByUsername(emailOrUsername);
    }

    private async checkEmailExists(email: string) {
        const count = await this.accountService.count({
            email
        });

        return count > 0;
    }

    private async generateUsername(name: string): Promise<string> {
        const pointSlug = generatePointSlug(name);
        const count = await this.accountService.count({
            username: {
                startsWith: pointSlug,
            },
        });

        if (count > 0) {
            return `${pointSlug}${count}`;
        }

        return pointSlug;
    }
}