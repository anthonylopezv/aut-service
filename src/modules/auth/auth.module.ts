
import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{ 
      name: 'USER_SERVICE', 
      transport: Transport.TCP, 
      options: {
        host: 'localhost',
        port: 1337,
      } 
    }]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}