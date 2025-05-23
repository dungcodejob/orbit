import { isNil } from "@app/utils";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Cache } from 'cache-manager';




@Injectable()
export class BacklistService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {

    }

    async addTokenBlacklist(
        userId: number,
        tokenId: string,
        exp: number,
    ): Promise<void> {
        const now = Date.now();
        const ttl = (exp - now) * 1000;
        const key = this.createKey(userId, tokenId);

        if (ttl > 0) {
            this.cacheManager.set(key, now, ttl)
        }
    }

    async checkIfTokenIsBlacklisted(
        userId: number,
        tokenId: string,
    ): Promise<void> {
        const key = this.createKey(userId, tokenId);
        const time = await this.cacheManager.get<number>(
            key
        );

        if (!isNil(time)) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private createKey(
        userId: number,
        tokenId: string,
    ) {
        return `blacklist:${userId}:${tokenId}`;
    }
}