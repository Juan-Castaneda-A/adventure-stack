import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UpdateConfiguracionDto } from './dto/update-configuracion.dto';

@Injectable()
export class ConfiguracionService {
  constructor(private prisma: PrismaService) {}

  // 1. OBTENER CONFIGURACIÓN (Si no existe, crea la primera por defecto)
  async findPublic() {
    let config = await this.prisma.configuracion.findFirst();

    if (!config) {
      // ¡Aquí nace la configuración inicial de tu sistema!
      config = await this.prisma.configuracion.create({
        data: {
          nombreNegocio: "Dr. Adventure",
          tipoNegocio: "MEDICO", // <--- IMPORTANTE: Empieza como MEDICO para probar el módulo
          descripcion: "Especialistas en salud integral.",
          telefonoVisible: "3001234567"
        }
      });
    }
    return config;
  }

  // 2. ACTUALIZAR (Para cambiar de MEDICO a LEGAL luego)
  async update(updateConfiguracionDto: UpdateConfiguracionDto) {
    // Primero obtenemos la config existente para saber su ID
    const config = await this.findPublic();
    
    return await this.prisma.configuracion.update({
      where: { id: config.id },
      data: updateConfiguracionDto,
    });
  }
}