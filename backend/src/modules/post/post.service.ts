import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponsePostDto } from '@/modules/post/dto/response-post.dto';

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
        tecnologias: {
          connect: createPostDto.tecnologias.map((id) => ({ id })),
        },
      },
    });
  }

  findAll(): Promise<ResponsePostDto[]> {
    return this.prisma.post.findMany({
      select: {
        contenido: true,
        createdAt: true,
        id: true,
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
            border: true,
            background: true,
            text: true,
          },
        },
      },
    });
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
