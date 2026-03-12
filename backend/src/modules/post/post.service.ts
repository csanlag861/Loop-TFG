import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponsePostDto } from '@/modules/post/dto/response-post.dto';
import { ResponsePostlistDto } from './dto/response-postlist-dto';
import { PostMapper } from './mapper/post.mapper';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

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
      ...(cursor && { id: { lt: cursor } }),
      ...(search && {
        contenido: { contains: search, mode: 'insensitive' as const },
      }),
      ...(username && {
        usuario: {
          username: { contains: username, mode: 'insensitive' as const },
        },
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
        include: { usuario: true, tecnologias: true },
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
