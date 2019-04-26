
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";

import { UserModule } from "user-service-mdl";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {}