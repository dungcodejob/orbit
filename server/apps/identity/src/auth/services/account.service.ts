
import { SLUG_REGEX } from "@app/constants";
import { PrismaService } from "@app/prisma";
import { BadRequestException, Injectable } from "@nestjs/common";
import { User, Prisma, Account } from '@prisma/client';
import { isUUID } from "class-validator";
import { validate } from 'uuid'

type AccountWithUser = Prisma.AccountGetPayload<{
    include: {
        user: true;
    };
}>;

@Injectable()
export class AccountService {
    constructor(private prisma: PrismaService) { }

    async findOneByIdOrUsername(
        idOrUsername: string,
    ): Promise<Account | null> {
        const isUUID = validate(idOrUsername);

        if (isUUID) {
            return this.findOneById(idOrUsername);
        }

        if (
            idOrUsername.length < 3 ||
            idOrUsername.length > 106 ||
            !SLUG_REGEX.test(idOrUsername)
        ) {
            throw new BadRequestException('Invalid username');
        }

        return this.findOneByUsername(idOrUsername);
    }

    async findOneById(id: string): Promise<AccountWithUser | null> {
        return this.prisma.account.findUnique({
            where: {
                id: id,
            },
            include: {
                user: true,
            }
        });
    }

    async findOneByUsername(username: string): Promise<AccountWithUser | null> {
        return this.prisma.account.findUnique({
            where: {
                username: username,
            },
            include: {
                user: true,
            }
        })
    }

    async findOneByEmail(email: string): Promise<AccountWithUser | null> {
        return this.prisma.account.findUnique({
            where: {
                email: email,
            },
            include: {
                user: true,
            }
        })
    }

    async count(where: Prisma.AccountWhereInput): Promise<number> {
        return this.prisma.account.count({
            where,
        });
    }

    async create(data: Prisma.AccountCreateInput): Promise<Account> {
        return this.prisma.account.create({
            data,
        });
    }

}