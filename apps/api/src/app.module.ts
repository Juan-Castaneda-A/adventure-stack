import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma.module'; // <--- Importamos el Módulo Nuevo
import { AuthModule } from './modules/auth/auth.module';
import { TramitesModule } from './modules/tramites/tramites.module';
import { ConfiguracionModule } from './modules/configuracion/configuracion.module';

@Module({
  imports: [
    PrismaModule, // <--- Lo agregamos aquí (El Global)
    UsersModule, AuthModule, TramitesModule, ConfiguracionModule
  ],
  controllers: [AppController],
  providers: [AppService], // <--- QUITAMOS PrismaService de aquí (ya está en PrismaModule)
})
export class AppModule {}