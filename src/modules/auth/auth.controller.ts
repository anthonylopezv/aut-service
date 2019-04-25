
import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { AuthService } from "./auth.service";
import { User } from "./interfaces/auth.interface";
import { CreateUserDto } from "./dto/created-user.dto";

@ApiUseTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('users')
  @ApiOperation({ title: 'List users' })
  async listUsers() {
    const users = await this.authService.listUsers();
    return users;
  }

  @Post('/login')
  @ApiOperation({ title: 'Signin' })
  async signin(@Body() createUserDto: CreateUserDto) {
    const auth = await this.authService.signin(createUserDto);
    return auth;
  }

  @Post('users')
  @ApiOperation({ title: 'Create users' })
  async createdUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.createdUser(createUserDto);
    return newUser;
  }
}