import { DEFAULT_TOKEN_EXPIRED, DEFAULT_TOKEN_SALT, DEFAULT_TOKEN_SECRET } from "@app/constants";
import { Inject } from "@nestjs/common";
import { ConfigType, registerAs } from "@nestjs/config";
import { TokenTypeEnum } from "../src/auth/enums/token-type.enum";





export const appConfig = registerAs("app", () => ({
    appId: process.env.APP_ID || 'app_id',
    client: process.env.CLIENT_DOMAIN || "http://localhost:4200",
    host: process.env.APP_HOST || "localhost",
    port: Number(process.env.APP_PORT) || 3000,
    scheme: process.env.APP_SCHEME || "http",
    get domain() {
        return `${this.scheme}://${this.host}:${this.port}`;
    },
}));



export type AppConfig = ConfigType<typeof appConfig>;
export const InjectAppConfig = () => Inject(appConfig.KEY);
