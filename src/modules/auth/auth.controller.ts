
import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from "./auth.service";
import { User } from "./interfaces/auth.interface";

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async listUsers() {
    console.log(this.authService.listUsers());
    return this.authService.listUsers();
  }
}