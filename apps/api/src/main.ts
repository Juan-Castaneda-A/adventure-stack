import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <--- IMPORTAR

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // PERMITIR QUE EL FRONTEND HABLE CON EL BACKEND
  app.enableCors();
  
  // ACTIVAR VALIDACIÓN GLOBAL
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina datos que no estén en el DTO (seguridad)
    forbidNonWhitelisted: true, // Lanza error si envían datos basura
  }));

  await app.listen(3000);
}
bootstrap();