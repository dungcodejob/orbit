import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentityService {
  private users: any[] = [];

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }

  createUser(user: any) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, userData: any) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    
    const updatedUser = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date(),
    };
    
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  deleteUser(id: number) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    
    this.users.splice(userIndex, 1);
    return true;
  }
}
