import { PrismaService } from "@app/prisma";
import { Injectable } from "@nestjs/common";
import { Prisma, Tenant } from "@prisma/client";


@Injectable()
export class TenantService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.TenantCreateInput): Promise<Tenant> {
        return this.prisma.tenant.create({
            data,
        });
    }

}