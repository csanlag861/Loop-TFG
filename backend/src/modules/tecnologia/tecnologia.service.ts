import { Injectable } from '@nestjs/common';
import { CreateTecnologiaDto } from './dto/create-tecnologia.dto';
import { UpdateTecnologiaDto } from './dto/update-tecnologia.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TecnologiaService {
  constructor(private readonly prisma: PrismaService) { }

  create(createTecnologiaDto: CreateTecnologiaDto) {
    return 'This action adds a new tecnologia';
  }

  getTecnologias() {
    return this.prisma.tecnologia.findMany({
      orderBy: { nombre: 'asc' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} tecnologia`;
  }

  update(id: number, updateTecnologiaDto: UpdateTecnologiaDto) {
    return `This action updates a #${id} tecnologia`;
  }

  remove(id: number) {
    return `This action removes a #${id} tecnologia`;
  }
}
