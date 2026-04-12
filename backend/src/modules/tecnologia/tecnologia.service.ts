import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTecnologiaDto } from './dto/create-tecnologia.dto';
import { UpdateTecnologiaDto } from './dto/update-tecnologia.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TecnologiaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTecnologiaDto: CreateTecnologiaDto) {
    const tecnologiaExistente = await this.prisma.tecnologia.findUnique({
      where: { nombre: createTecnologiaDto.nombre },
    });

    if (tecnologiaExistente) {
      throw new ConflictException(
        `La tecnología "${createTecnologiaDto.nombre}" ya existe`,
      );
    }

    return this.prisma.tecnologia.create({ data: createTecnologiaDto });
  }

  getTecnologias() {
    return this.prisma.tecnologia.findMany({
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number) {
    const tecnologia = await this.prisma.tecnologia.findUnique({
      where: { id },
    });

    if (!tecnologia) {
      throw new NotFoundException(`La tecnología con ID ${id} no existe`);
    }

    return tecnologia;
  }

  async update(id: number, updateTecnologiaDto: UpdateTecnologiaDto) {
    await this.findOne(id);

    if (updateTecnologiaDto.nombre) {
      const tecnologiaExistente = await this.prisma.tecnologia.findUnique({
        where: { nombre: updateTecnologiaDto.nombre },
      });

      if (tecnologiaExistente) {
        throw new ConflictException(
          `La tecnología "${updateTecnologiaDto.nombre}" ya existe`,
        );
      }
    }

    return this.prisma.tecnologia.update({
      where: { id },
      data: updateTecnologiaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tecnologia.delete({ where: { id } });
  }
}
