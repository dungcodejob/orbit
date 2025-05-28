import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { SERVICE_TOKENS } from "@app/constants";


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
    controllers: [AuthController],
    providers: [
        AuthService,

    ],
    exports: [AuthService],
})
export class AuthModule { }