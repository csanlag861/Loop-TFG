import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponsePostDto } from '@/modules/post/dto/response-post.dto';
import { ResponsePostlistDto } from './dto/response-postlist-dto';
import { PostMapper } from './mapper/post.mapper';
import { UserEntity } from '../user/user.entity';
import { UsuarioEstadoEnum } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  create(createPostDto: CreatePostDto, userId: number) {
    return this.prisma.post.create({
      data: {
        contenido: createPostDto.contenido,
        usuario: {
          connect: { id: userId },
        },
        ...(createPostDto.tecnologias.length > 0 && {
          tecnologias: {
            connect: createPostDto.tecnologias.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  async findAll(
    cursor?: number,
    user_id?: number,
    search?: string,
    username?: string,
    tech?: string,
  ): Promise<ResponsePostlistDto> {
    const take = 10;

    const where = {
      usuario: {
        deletedAt: null,
        estado: {
          notIn: [UsuarioEstadoEnum.BLOQUEADO, UsuarioEstadoEnum.SUSPENDIDO],
        },
        ...(username && {
          username: { contains: username, mode: 'insensitive' as const },
        }),
      },
      ...(cursor && { id: { lt: cursor } }),
      ...(search && {
        contenido: { contains: search, mode: 'insensitive' as const },
      }),
      ...(tech && {
        tecnologias: {
          some: { nombre: { contains: tech, mode: 'insensitive' as const } },
        },
      }),
    };

    // eslint-disable-next-line prefer-const
    let [posts, count] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        where,
        take: take + 1,
        include: {
          usuario: {
            select: {
              id: true,
              username: true,
              avatarURL: true,
              nombre: true,
            },
          },
          tecnologias: true,
          ...(user_id !== undefined && {
            postGuardados: {
              where: { usuario_id: user_id },
              select: { id: true },
            },
          }),
          ...(user_id !== undefined && {
            likes: {
              where: { usuario_id: user_id },
              select: { id: true },
            },
          }),
          _count: {
            select: {
              likes: true,
            },
          },
        },
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      }),
      this.prisma.post.count({
        where,
      }),
    ]);

    const hasNextPage = posts.length > take;
    posts = hasNextPage ? posts.slice(0, -1) : posts;

    const currentUser = user_id ? new UserEntity(user_id) : null;
    return {
      list: posts.map((post) => PostMapper.toResponse(post, currentUser)),
      metadata: {
        count,
        hasNextPage,
        cursor: posts.at(-1)?.id,
      },
    };
  }

  findOne(id: number): Promise<ResponsePostDto> {
    return this.prisma.post.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        contenido: true,
        createdAt: true,
        usuario: {
          select: {
            avatarURL: true,
            nombre: true,
            username: true,
          },
        },
        tecnologias: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });
  }

  getPostsFromUser(user_id: number) {
    return this.prisma.post.findMany({
      where: {
        usuario_id: user_id,
        usuario: {
          deletedAt: null,
          estado: {
            notIn: [UsuarioEstadoEnum.BLOQUEADO, UsuarioEstadoEnum.SUSPENDIDO],
          },
        },
      },
      include: {
        usuario: true,
        tecnologias: true,
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id: id },
      data: {
        contenido: updatePostDto.contenido,
        tecnologias: {
          set: updatePostDto.tecnologias?.map((id) => ({ id })),
        },
      },
    });
  }

  async remove(id: number) {
    try {
      await this.prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    return HttpStatus.OK;
  }
}
