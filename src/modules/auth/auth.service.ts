
import { Injectable, Inject, OnModuleInit } from "@nestjs/common";
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { User } from "./interfaces/auth.interface";

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async onModuleInit() {
    console.log(this.client.connect());
    await this.client.connect();
  }

  listUsers(): Observable<User[]> {
    const pattern = { cmd: 'FIND_USERS' };
    return this.client.send<User[]>(pattern, []);
  }
}