import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, pass: string) {
    // 1. Buscamos al usuario por email
    // (Aquí usaremos un truco: necesitamos buscar por email, no por ID. 
    // Si te da error, luego agregamos el metodo 'findByEmail' en UsersService)
    const user = await this.usersService.findByEmail(email);
    // 2. Si no existe el usuario, error
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Comparamos la contraseña encriptada
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 4. Generamos la "manilla" (Token)
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { fullName: user.fullName, email: user.email } // Devolvemos datos básicos
    };
  }
}