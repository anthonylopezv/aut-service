import { Injectable, Inject } from "@nestjs/common";

import { ClientProxy } from "@nestjs/microservices";

import { User } from "../auth/interfaces/auth.interface";
import { CreateUserDto } from "../auth/dto/created-user.dto";

import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    const connect = this.client.connect();
    return connect;
  }

  async signin(createdUserDto: CreateUserDto) {
    const pattern = { cmd: 'FIND_USER' };
    const { username, password } = createdUserDto;

    const user = await this.client.send<User>(pattern, username).toPromise();
    
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