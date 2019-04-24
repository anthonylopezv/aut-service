
import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from "./auth.service";
import { User } from "./interfaces/auth.interface";
import { async } from 'rxjs/internal/scheduler/async';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async listUsers() {
    return await this.authService.listUsers();
  }

  @Post('/login')
  async signin(@Body() username: string, @Body() password: string) {
    return await this.authService.signin(username, password);
  }
}