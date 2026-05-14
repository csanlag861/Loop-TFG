import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ComentariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user_id: number, createComentarioDto: CreateComentarioDto) {
    const { post_id, contenido, parent_id } = createComentarioDto;

    if (parent_id) {
      const parent = await this.prisma.comentario.findUnique({
        where: { id: parent_id },
      });

      if (!parent || parent.post_id !== post_id) {
        throw new BadRequestException('Comentario padre inválido');
      }
    }

    return this.prisma.comentario.create({
      data: {
        usuario_id: user_id,
        post_id,
        contenido,
        parent_id: parent_id ?? null,
      },
      include: {
        usuario: {
          select: {
            id: true,
            username: true,
            avatarURL: true,
            nombre: true,
          },
        },
      },
    });
  }

  async remove(id: number, user_id: number) {
    const comentario = await this.prisma.comentario.findUnique({
      where: { id },
    });

    if (!comentario) throw new NotFoundException();

    if (comentario.usuario_id !== user_id) throw new ForbiddenException();

    await this.prisma.comentario.delete({
      where: { id },
    });

    return HttpStatus.ACCEPTED;
  }
}
