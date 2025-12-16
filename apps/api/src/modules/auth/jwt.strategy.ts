import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Busca el token en el Header "Authorization"
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secreto_por_defecto', // La misma clave del .env
    });
  }

  async validate(payload: any) {
    // Esto inyecta el usuario en "request.user" para que lo uses luego
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}