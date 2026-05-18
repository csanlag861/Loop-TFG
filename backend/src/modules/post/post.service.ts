import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
              comentarios: true,
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

  async findOne(id: number, user_id?: number) {
    try {
      const post = await this.prisma.post.findUniqueOrThrow({
        where: { id },
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
              comentarios: true,
            },
          },
        },
      });

      const currentUser = user_id ? new UserEntity(user_id) : null;

      return PostMapper.toResponse(post, currentUser);
    } catch (error) {
      throw new NotFoundException(`Post con ID ${id} no encontrado`);
    }
  }

  async findByPost(post_id: number, cursor?: number) {
    const take = 10;

    let comentarios = await this.prisma.comentario.findMany({
      where: {
        post_id,
        parent_id: null,
        ...(cursor && { id: { lt: cursor } }),
        usuario: {
          deletedAt: null,
          estado: {
            notIn: [UsuarioEstadoEnum.BLOQUEADO, UsuarioEstadoEnum.SUSPENDIDO],
          },
        },
      },
      take: take + 1,
      orderBy: [{ id: 'desc' }],
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

    const hasNextPage = comentarios.length > take;
    comentarios = hasNextPage ? comentarios.slice(0, -1) : comentarios;

    return {
      list: comentarios,
      metadata: {
        hasNextPage,
        cursor: comentarios.at(-1)?.id,
      },
    };
  }

  async getPostsFromUser(
    user_id: number,
    cursor?: number,
    request_user_id?: number,
  ) {
    const take = 10;

    const where = {
      usuario_id: user_id, // Filtrar por el autor
      ...(cursor && { id: { lt: cursor } }),
      usuario: {
        deletedAt: null,
        estado: {
          notIn: [UsuarioEstadoEnum.BLOQUEADO, UsuarioEstadoEnum.SUSPENDIDO],
        },
      },
    };

    // eslint-disable-next-line prefer-const
    let [posts, count] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        where,
        take: take + 1,
        include: {
          usuario: {
            select: { id: true, username: true, avatarURL: true, nombre: true },
          },
          tecnologias: true,
          ...(request_user_id !== undefined && {
            postGuardados: {
              where: { usuario_id: request_user_id },
              select: { id: true },
            },
          }),
          ...(request_user_id !== undefined && {
            likes: {
              where: { usuario_id: request_user_id },
              select: { id: true },
            },
          }),
          _count: { select: { likes: true, comentarios: true } },
        },
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      }),
      this.prisma.post.count({ where }),
    ]);

    const hasNextPage = posts.length > take;
    posts = hasNextPage ? posts.slice(0, -1) : posts;

    const currentUser = request_user_id
      ? new UserEntity(request_user_id)
      : null;

    return {
      list: posts.map((post) => PostMapper.toResponse(post, currentUser)),
      metadata: { count, hasNextPage, cursor: posts.at(-1)?.id },
    };
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

  async getUserLikes(
    user_id: number,
    cursor?: number,
    request_user_id?: number,
  ) {
    const take = 10;

    const where = {
      likes: { some: { usuario_id: user_id } },
      ...(cursor && { id: { lt: cursor } }),
      usuario: {
        deletedAt: null,
        estado: {
          notIn: [UsuarioEstadoEnum.BLOQUEADO, UsuarioEstadoEnum.SUSPENDIDO],
        },
      },
    };

    // eslint-disable-next-line prefer-const
    let [posts, count] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        where,
        take: take + 1,
        include: {
          usuario: {
            select: { id: true, username: true, avatarURL: true, nombre: true },
          },
          tecnologias: true,
          ...(request_user_id !== undefined && {
            postGuardados: {
              where: { usuario_id: request_user_id },
              select: { id: true },
            },
          }),
          ...(request_user_id !== undefined && {
            likes: {
              where: { usuario_id: request_user_id },
              select: { id: true },
            },
          }),
          _count: { select: { likes: true, comentarios: true } },
        },
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      }),
      this.prisma.post.count({ where }),
    ]);
    const hasNextPage = posts.length > take;
    posts = hasNextPage ? posts.slice(0, -1) : posts;
    const currentUser = request_user_id
      ? new UserEntity(request_user_id)
      : null;
    return {
      list: posts.map((post) => PostMapper.toResponse(post, currentUser)),
      metadata: { count, hasNextPage, cursor: posts.at(-1)?.id },
    };
  }
}
