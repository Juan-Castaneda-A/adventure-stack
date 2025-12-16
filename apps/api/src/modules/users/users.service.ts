import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt'; // <--- 1. Importar bcrypt

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // 2. Encriptar la contraseña (Hashing)
    // El '10' es el costo de procesamiento (Salts). Más alto = más seguro pero más lento.
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 3. Crear el usuario usando la contraseña encriptada
    return await this.prisma.user.create({
      data: {
        ...createUserDto, // Copia email y fullName
        password: hashedPassword, // Reemplaza la password plana por la encriptada
      },
    });
  }

  // ... (El resto de métodos findAll, findOne, etc. quedan igual)
  async findAll() {
    return await this.prisma.user.findMany();
  }
  
  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // OJO: Si actualizan la password, también habría que encriptarla aquí.
    // Por ahora dejémoslo simple.
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}