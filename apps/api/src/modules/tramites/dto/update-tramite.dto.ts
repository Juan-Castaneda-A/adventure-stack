import { PartialType } from '@nestjs/mapped-types';
import { CreateTramiteDto } from './create-tramite.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTramiteDto extends PartialType(CreateTramiteDto) {
  @IsOptional()
  @IsString()
  estado?: string; // <--- Agregamos esto para permitir cambiar el estado
}