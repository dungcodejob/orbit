import { PrismaModule } from "@app/prisma";
import { TenantService } from "./tenant.service";
import { Module } from "@nestjs/common";
import { TenantController } from "./tenant.controller";


@Module({
    imports: [
        PrismaModule,
    ],
    controllers: [TenantController],
    providers: [
        TenantService
    ],
    exports: [TenantService],
})
export class TenantModule { }