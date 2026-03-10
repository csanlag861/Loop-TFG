import { Module } from '@nestjs/common';
import { TecnologiaService } from './tecnologia.service';
import { TecnologiaController } from './tecnologia.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TecnologiaController],
  providers: [TecnologiaService],
  exports: [TecnologiaService],
})
export class TecnologiaModule { }
