

import { ITokenBase } from './token-base.interface';

export interface IAccessPayload {
    id: string;
    email: string;
    tenantId: string | null;
}

export interface IAccessToken extends IAccessPayload, ITokenBase { }