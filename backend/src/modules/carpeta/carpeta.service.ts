import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCarpetaDto } from './dto/create-carpeta.dto';
import { UpdateCarpetaDto } from './dto/update-carpeta.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarpetaService {
  DEFAULT: string = 'FAVORITOS';
  CONFLICT_EXCEPTION: string = 'P2002';

  constructor(private readonly prisma: PrismaService) {}

  async create(user_id: number, createCarpetaDto: CreateCarpetaDto) {
    const nombre = createCarpetaDto.nombre.toUpperCase();

    try {
      return await this.prisma.carpeta.create({
        data: {
          usuario_id: user_id,
          nombre,
        },
      });
    } catch (error) {
      if (error.code === this.CONFLICT_EXCEPTION) {
        throw new ConflictException(
          `Ya tienes una carpeta llamada "${nombre}"`,
        );
      }
      throw error;
    }
  }

  async findAll(user_id: number) {
    return await this.prisma.carpeta.findMany({
      where: { usuario_id: user_id },
      select: {
        id: true,
        nombre: true,
        createdAt: true,
      },
    });
  }

  async findOne(user_id: number, carpeta_id: number) {
    const carpeta = await this.prisma.carpeta.findFirst({
      where: { id: carpeta_id, usuario_id: user_id },
      include: {
        postGuardados: {
          include: {
            post: {
              include: {
                usuario: true,
                tecnologias: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!carpeta) {
      throw new HttpException('Carpeta no encontrada', HttpStatus.NOT_FOUND);
    }
    return carpeta;
  }

  async update(
    carpeta_id: number,
    user_id: number,
    updateCarpetaDto: UpdateCarpetaDto,
  ) {
    const carpeta = await this.prisma.carpeta.findUnique({
      where: { id: carpeta_id },
    });

    if (!carpeta) {
      throw new HttpException('Carpeta no encontrada', HttpStatus.NOT_FOUND);
    }

    if (carpeta.usuario_id !== user_id) {
      throw new HttpException(
        'No tienes permisos para editar esta carpeta',
        HttpStatus.FORBIDDEN,
      );
    }

    if (carpeta.nombre === this.DEFAULT) {
      throw new HttpException(
        'No tienes permisos para editar esta carpeta',
        HttpStatus.FORBIDDEN,
      );
    }

    const nombre = updateCarpetaDto.nombre?.toUpperCase();

    try {
      return await this.prisma.carpeta.update({
        where: { id: carpeta_id },
        data: { nombre },
      });
    } catch (error) {
      if (error.code === this.CONFLICT_EXCEPTION) {
        throw new ConflictException(
          `Ya tienes una carpeta llamada "${nombre}"`,
        );
      }
      throw error;
    }
  }

  async remove(carpeta_id: number, user_id: number, eliminar: boolean) {
    const carpeta = await this.prisma.carpeta.findUnique({
      where: { id: carpeta_id },
      include: { postGuardados: true },
    });

    if (!carpeta) {
      throw new HttpException('Carpeta no encontrada', HttpStatus.NOT_FOUND);
    }

    if (carpeta.usuario_id !== user_id) {
      throw new HttpException(
        'No tienes permisos para editar esta carpeta',
        HttpStatus.FORBIDDEN,
      );
    }

    if (carpeta.nombre === this.DEFAULT) {
      throw new HttpException(
        'No tienes permisos para editar esta carpeta',
        HttpStatus.FORBIDDEN,
      );
    }

    const hasPosts = carpeta.postGuardados.length > 0;

    if (hasPosts) {
      if (eliminar) {
        await this.prisma.$transaction([
          this.prisma.postGuardado.deleteMany({
            where: { carpeta_id },
          }),

          this.prisma.carpeta.delete({ where: { id: carpeta_id } }),
        ]);
      } else {
        const carpetaFavorito = await this.prisma.carpeta.findFirst({
          where: { usuario_id: user_id, nombre: this.DEFAULT },
        });

        console.log(carpetaFavorito);
        

        await this.prisma.$transaction([
          this.prisma.postGuardado.updateMany({
            where: { carpeta_id },
            data: { carpeta_id: carpetaFavorito?.id },
          }),

          this.prisma.carpeta.delete({ where: { id: carpeta_id } }),
        ]);
      }
    } else {
      await this.prisma.carpeta.delete({ where: { id: carpeta_id } });
    }

    return { message: 'Carpeta eliminada correctamente' };
  }
}
