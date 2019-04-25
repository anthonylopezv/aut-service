
import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from "./auth.service";
import { User } from "./interfaces/auth.interface";
import { CreateUserDto } from "./dto/created-user.dto";

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async listUsers() {
    return await this.authService.listUsers();
  }

  @Post('/login')
  async signin(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signin(createUserDto);
  }

  @Post()
  async createdUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createdUser(createUserDto);
  }
}