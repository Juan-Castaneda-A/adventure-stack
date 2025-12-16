import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail() // Verifica que sea un email real
  email: string;

  @IsString()
  @MinLength(6) // Mínimo 6 caracteres para la password
  password: string;

  @IsString()
  @IsOptional() // Este campo no es obligatorio
  fullName?: string;
}