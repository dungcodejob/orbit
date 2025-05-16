import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return this.identityService.getUsers();
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  getUserById(@Payload() id: number) {
    return this.identityService.getUserById(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  createUser(@Payload() userData: any) {
    return this.identityService.createUser(userData);
  }

  @MessagePattern({ cmd: 'update_user' })
  updateUser(@Payload() data: { id: number; userData: any }) {
    return this.identityService.updateUser(data.id, data.userData);
  }

  @MessagePattern({ cmd: 'delete_user' })
  deleteUser(@Payload() id: number) {
    return this.identityService.deleteUser(id);
  }
}
