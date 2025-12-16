import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // <--- Importamos Usuarios
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Necesitamos buscar usuarios
    JwtModule.register({
      global: true, // El JWT funcionará en toda la app
      secret: process.env.JWT_SECRET || 'secreto_por_defecto', // Tu clave del .env
      signOptions: { expiresIn: '1d' }, // El token (manilla) dura 1 día
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}