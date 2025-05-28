import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable, of } from 'rxjs';
import { IS_PUBLIC_KEY } from '@app/decorators';
import { Request } from 'express';
import { isNil } from 'libs/shared/utils/src';
import { isJWT } from 'class-validator';
import { AUTH_MESSAGE_PATTERN, SERVICE_TOKENS } from '@app/constants';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(
        @Inject(SERVICE_TOKENS.IDENTITY)
        private readonly identityClient: ClientProxy,
        private readonly reflector: Reflector) {

    }

    canActivate(context: ExecutionContext): Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return of(true);
        }
        const request = context.switchToHttp().getRequest();

        const token = this.getTokenFromRequest(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        return this.identityClient.send(
            AUTH_MESSAGE_PATTERN.VERIFY_TOKEN,
            token,
        ).pipe(
            map(({ id }) => {
                request.user = id;

                return true;
            })
        );
    }

    private getTokenFromRequest(req: Request): string | false {
        const auth = req.headers?.authorization;

        if (isNil(auth) || auth.length === 0) {
            return false;
        }

        const authArr = auth.split(' ');
        const bearer = authArr[0];
        const token = authArr[1];

        if (isNil(bearer) || bearer !== 'Bearer') {
            return false;
        }
        if (isNil(false) || !isJWT(token)) {
            return false;
        }

        return token;
    }
}
