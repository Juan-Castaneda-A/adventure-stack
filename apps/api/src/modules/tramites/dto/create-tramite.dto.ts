import { IsString, IsNotEmpty, IsDateString, IsOptional, IsEmail } from 'class-validator';

export class CreateTramiteDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDateString()
  fechaCita: string;

  // NUEVOS CAMPOS
  @IsString()
  @IsOptional()
  nombreCliente?: string;

  @IsEmail()
  @IsOptional()
  emailCliente?: string;

  @IsString()
  @IsOptional()
  telefonoCliente?: string;
}