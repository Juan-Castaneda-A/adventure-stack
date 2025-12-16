import { Injectable } from '@nestjs/common';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { PrismaService } from '../../prisma.service'; // Importa Prisma (quizás tengas que ajustar la ruta ../../)

@Injectable()
export class TramitesService {
  constructor(private prisma: PrismaService) {}

  // Crear trámite (Recibimos los datos Y el ID del usuario logueado)
  async create(createTramiteDto: CreateTramiteDto, userId: string | null) {
    return await this.prisma.tramite.create({
      data: {
        ...createTramiteDto,
        userId: userId, // Puede ser null si viene del formulario público
      },
    });
  }

  // Ver TODOS los trámites (Para el Notario/Admin)
  async findAll() {
    return await this.prisma.tramite.findMany({
      include: { user: true }, // ¡Truco! Trae también los datos del usuario dueño del trámite
    });
  }

  // Ver SOLO mis trámites (Para el cliente normal)
  async findMyTramites(userId: string) {
    return await this.prisma.tramite.findMany({
      where: { userId: userId },
    });
  }
}