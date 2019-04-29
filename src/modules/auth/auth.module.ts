
import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";

import { UserModule } from "user-service-mdl";

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from "./auth.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule.forRoot({
      host: '157.230.212.28',
      port: 1337,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}