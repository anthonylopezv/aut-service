
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.enableCors();

  await app.listen(parseInt(process.env.PORT) || 9000);
}
bootstrap();