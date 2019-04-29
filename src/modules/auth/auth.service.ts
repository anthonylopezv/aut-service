import { Injectable } from "@nestjs/common";

import { UserService } from "user-service-mdl/lib/user.service";

import { CreateUserDto } from "./dto/created-user.dto";

import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    const connect = this.userService.onModuleInit();
    return connect;
  }

  async signin(createdUserDto: CreateUserDto) {
    const { password } = createdUserDto;

    const user = await this.userService.signin(createdUserDto);
    
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
    const users = await this.userService.listUsers();
    return users;
  }

  async createdUser(createUserDto: CreateUserDto) {
    const newUser = await this.userService.createdUser(createUserDto);
    return newUser;
  }
}