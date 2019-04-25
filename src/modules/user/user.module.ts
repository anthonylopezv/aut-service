
import { Module } from "@nestjs/common";

import { UserService } from "./user.service";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    ClientsModule.register([{ 
      name: 'USER_SERVICE', 
      transport: Transport.TCP, 
      options: {
        host: '157.230.212.28',
        port: 1337,
      } 
    }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}