import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import { UpdateConfiguracionDto } from './dto/update-configuracion.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('configuracion')
export class ConfiguracionController {
  constructor(private readonly configuracionService: ConfiguracionService) {}

  // PÚBLICO: Para que la Landing Page sepa qué mostrar
  @Get()
  findPublic() {
    return this.configuracionService.findPublic();
  }

  // PRIVADO: Para cambiar el nombre o tipo de negocio
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  update(@Body() updateConfiguracionDto: UpdateConfiguracionDto) {
    return this.configuracionService.update(updateConfiguracionDto);
  }
}