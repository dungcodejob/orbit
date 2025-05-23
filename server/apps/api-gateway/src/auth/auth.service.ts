
import { AUTH_MESSAGE_PATTERN,  SERVICE_TOKENS } from '@app/constants';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
    constructor(@Inject(SERVICE_TOKENS.IDENTITY) private readonly client: ClientProxy) { }

    register(email: string, password: string, name: string) {
        return this.client.send(AUTH_MESSAGE_PATTERN.REGISTER, { email, password, name });
    }


}