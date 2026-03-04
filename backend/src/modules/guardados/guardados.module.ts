import { Module } from '@nestjs/common';
import { GuardadosService } from './guardados.service';
import { GuardadosController } from './guardados.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GuardadosController],
  providers: [GuardadosService],
})
export class GuardadosModule {}
