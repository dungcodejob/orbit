import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@prisma/client";

type UserRecord = keyof User;
export const CURRENT_USER_KEY = 'user';

export const CurrentUser = createParamDecorator((data: UserRecord, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request[CURRENT_USER_KEY]?.[data] : request[CURRENT_USER_KEY];
});