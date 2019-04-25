
import { Injectable, Inject, OnModuleInit } from "@nestjs/common";
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { User } from "./interfaces/auth.interface";
import { CreateUserDto } from './dto/created-user.dto';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async signin(createUserDto: CreateUserDto) {
    const pattern = { cmd: 'FIND_USERS' };
    const users = await this.client.send<User[]>(pattern, []).toPromise();
    const {username, password} = createUserDto;
    const user = users.find(u => u.username === username)

    if (!user) return 'User no found';
    else if (user.password === password) {
      const token = this.jwtService.sign(user);
      return {
        user,
        token
      }
    }
    else { return 'Password dont match' }
  }

  async listUsers() {
    const pattern = { cmd: 'FIND_USERS' };
    const users = await this.client.send<User[]>(pattern, []).toPromise();
    return users;
  }

  async createdUser(createUserDto: CreateUserDto) {
    const pattern = { cmd: 'CREATED_USER' };
    const newUser = await this.client.send<User[]>(pattern, createUserDto).toPromise();
    return newUser;
  }
}