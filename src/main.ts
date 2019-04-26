
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./modules/app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Auth service')
    .setDescription('The auth service API description')
    .setVersion('1.0')
    .addTag('auth users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.PORT) || 9000);
  console.log('Server on port', 9000);
}
bootstrap();