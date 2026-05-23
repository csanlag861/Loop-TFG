import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateGuardadoDto } from './dto/create-guardado.dto';
import { UpdateGuardadoDto } from './dto/update-guardado.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GuardadosService {
  CONFLICT_EXCEPTION: string = 'P2002';
  constructor(private readonly prisma: PrismaService) {}

  async create(user_id: number, createGuardadoDto: CreateGuardadoDto) {
    try {
      const carpeta = await this.prisma.carpeta.findFirst({
        where: { id: createGuardadoDto.carpeta_id, usuario_id: user_id },
      });

      if (!carpeta) {
        throw new HttpException('Carpeta no encontrada', HttpStatus.NOT_FOUND);
      }

      try {
        return await this.prisma.postGuardado.create({
          data: {
            post_id: createGuardadoDto.post_id,
            carpeta_id: createGuardadoDto.carpeta_id,
            usuario_id: user_id,
          },
        });
      } catch (error) {
        if (error.code === this.CONFLICT_EXCEPTION) {
          throw new ConflictException(`Ya tienes ese post guardado.`);
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error interno al crear el post guardado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    guardado_id: number,
    user_id: number,
    updateGuardadoDto: UpdateGuardadoDto,
  ) {
    try {
      const guardado = await this.prisma.postGuardado.findUnique({
        where: { id: guardado_id },
      });

      if (!guardado) {
        throw new HttpException(
          'Post guardado no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      if (guardado.usuario_id !== user_id) {
        throw new HttpException(
          'No tienes permisos para mover este post',
          HttpStatus.FORBIDDEN,
        );
      }

      const carpetaDestino = await this.prisma.carpeta.findFirst({
        where: { id: updateGuardadoDto.carpeta_id, usuario_id: user_id },
      });

      if (!carpetaDestino) {
        throw new HttpException(
          'La carpeta a la que deseas mover el post no se ha encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.prisma.postGuardado.update({
        where: { id: guardado_id },
        data: { carpeta_id: updateGuardadoDto.carpeta_id },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error interno al actualizar el post guardado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(guardado_id: number, user_id: number) {
    try {
      const guardado = await this.prisma.postGuardado.findUnique({
        where: { id: guardado_id },
      });

      if (!guardado) {
        throw new HttpException(
          'Post guardado no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      if (guardado.usuario_id !== user_id) {
        throw new HttpException(
          'No tienes permisos para mover este post',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.prisma.postGuardado.delete({
        where: { id: guardado_id },
      });
      return { message: 'Post eliminado de guardados correctamente.' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error interno al eliminar el post guardado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
