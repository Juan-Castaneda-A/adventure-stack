import { Injectable } from '@nestjs/common';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { PrismaService } from '../../prisma.service'; // Importa Prisma (quizás tengas que ajustar la ruta ../../)
import { Resend } from 'resend';

@Injectable()
export class TramitesService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  constructor(private prisma: PrismaService) {}

  // Crear trámite (Recibimos los datos Y el ID del usuario logueado)
  async create(createTramiteDto: CreateTramiteDto, userId: string | null) {
    // A. Guardamos la cita en la Base de Datos (Esto ya lo tenías)
    const nuevoTramite = await this.prisma.tramite.create({
      data: {
        ...createTramiteDto,
        userId: userId,
      },
    });

    // B. ¡ENVIAMOS LA ALERTA POR CORREO! 🚀
    // Solo enviamos correo si es una solicitud pública (tiene nombreCliente)
    if (createTramiteDto.nombreCliente) {
      try {
        await this.resend.emails.send({
          from: 'onboarding@resend.dev', // NO CAMBIAR (Es el correo de prueba de Resend)
          to: 'juanp.castaneda04@gmail.com', // <--- PON AQUÍ TU CORREO REAL (Con el que te registraste en Resend)
          subject: `🔔 Nueva Solicitud: ${createTramiteDto.nombreCliente}`,
          html: `
            <h1>¡Tienes un nuevo paciente!</h1>
            <p><strong>Nombre:</strong> ${createTramiteDto.nombreCliente}</p>
            <p><strong>Motivo:</strong> ${createTramiteDto.titulo}</p>
            <p><strong>Teléfono:</strong> ${createTramiteDto.telefonoCliente}</p>
            <p><strong>Fecha deseada:</strong> ${new Date(createTramiteDto.fechaCita).toLocaleString()}</p>
            <br />
            <a href="https://adventure-stack.vercel.app/dashboard/tramites" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Ir al Dashboard
            </a>
          `
        });
        console.log('📧 Correo enviado exitosamente');
      } catch (error) {
        console.error('Error enviando correo:', error);
        // No lanzamos error para no detener el proceso si falla el correo
      }
    }

    return nuevoTramite;
  }

  async update(id: string, updateTramiteDto: any) { // Usamos 'any' o 'UpdateTramiteDto'
    return await this.prisma.tramite.update({
      where: { id },
      data: updateTramiteDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.tramite.delete({
      where: { id },
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