import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TramitesService } from './tramites.service';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { UpdateTramiteDto } from './dto/update-tramite.dto'; // Asegúrate de importar esto
import { AuthGuard } from '@nestjs/passport';;

@Controller('tramites')
export class TramitesController {
  constructor(private readonly tramitesService: TramitesService) {}

  // 1. ENDPOINT PÚBLICO (Para la Landing Page) - ¡Sin @UseGuards!
  @Post('publico')
  createPublic(@Body() createTramiteDto: CreateTramiteDto) {
    // Enviamos null como userId porque es un visitante anónimo
    return this.tramitesService.create(createTramiteDto, null);
  }

  // 2. ENDPOINT PRIVADO (Para el Médico/Admin desde el Dashboard)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createPrivate(@Body() createTramiteDto: CreateTramiteDto, @Request() req) {
    return this.tramitesService.create(createTramiteDto, req.user.userId);
  }

  // 3. GET PRIVADO (El Dashboard)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.tramitesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTramiteDto: UpdateTramiteDto) {
    return this.tramitesService.update(id, updateTramiteDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tramitesService.remove(id);
  }
}