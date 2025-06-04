import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable validationn pipes
  app.useGlobalPipes(new ValidationPipe());
  // enable guards
  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
