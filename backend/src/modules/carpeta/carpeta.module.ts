import { Module } from '@nestjs/common';
import { CarpetaService } from './carpeta.service';
import { CarpetaController } from './carpeta.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CarpetaController],
  providers: [CarpetaService],
  exports: [CarpetaService],
})
export class CarpetaModule {}
