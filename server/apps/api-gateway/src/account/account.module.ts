import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { SERVICE_TOKENS } from "@app/constants";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";


@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_TOKENS.IDENTITY,
        transport: Transport.TCP,
        options: {
          host: process.env.IDENTITY_SERVICE_HOST || 'localhost',
          port: process.env.IDENTITY_SERVICE_PORT ? parseInt(process.env.IDENTITY_SERVICE_PORT) : 3001,
        },
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,

  ],
  exports: [AccountService],
})
export class AccountModule { }