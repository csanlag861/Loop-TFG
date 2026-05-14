import { Module } from '@nestjs/common';
import { SeguidorService } from './seguidor.service';
import { SeguidorController } from './seguidor.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [SeguidorController],
  providers: [SeguidorService, PrismaService],
})
export class SeguidorModule {}
