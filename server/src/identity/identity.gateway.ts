import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IdentityGateway {
  constructor(
    @Inject('IDENTITY_SERVICE') private readonly identityClient: ClientProxy,
  ) {}

  async getUsers() {
    return firstValueFrom(this.identityClient.send({ cmd: 'get_users' }, {}));
  }

  async getUserById(id: number) {
    return firstValueFrom(this.identityClient.send({ cmd: 'get_user_by_id' }, id));
  }

  async createUser(userData: any) {
    return firstValueFrom(this.identityClient.send({ cmd: 'create_user' }, userData));
  }

  async updateUser(id: number, userData: any) {
    return firstValueFrom(
      this.identityClient.send({ cmd: 'update_user' }, { id, userData }),
    );
  }

  async deleteUser(id: number) {
    return firstValueFrom(this.identityClient.send({ cmd: 'delete_user' }, id));
  }
}