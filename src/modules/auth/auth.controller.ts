
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import { UserService } from "../user/user.service";
import { CreateUserDto } from "./dto/created-user.dto";

@ApiUseTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @ApiOperation({ title: 'List users' })
  async listUsers() {
    const users = await this.userService.listUsers();
    return users;
  }

  @Post('/login')
  @ApiOperation({ title: 'Signin' })
  async signin(@Body() createUserDto: CreateUserDto) {
    const auth = await this.userService.signin(createUserDto);
    return auth;
  }

  @Post('users')
  @ApiOperation({ title: 'Create users' })
  async createdUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createdUser(createUserDto);
    return newUser;
  }
}