import { PartialType } from '@nestjs/mapped-types';
import { CreateConfiguracionDto } from './create-configuracion.dto';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateConfiguracionDto extends PartialType(CreateConfiguracionDto) {
  @IsOptional()
  @IsString()
  nombreNegocio?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  telefonoVisible?: string;

  @IsOptional()
  @IsString()
  tipoNegocio?: string; // <--- ¡ESTE ES EL CULPABLE! Faltaba o estaba mal definido.

  @IsOptional()
  @IsNumber()
  precioBase?: number;
}