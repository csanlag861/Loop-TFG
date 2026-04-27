import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(post_id: number, user_id: number) {
    try {
      return await this.prisma.like.create({
        data: {
          post_id: post_id,
          usuario_id: user_id,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Ya has dado like a este post');
      }
      throw error;
    }
  }

  async unlikePost(post_id: number, user_id: number) {
    try {
      return await this.prisma.like.delete({
        where: {
          usuario_id_post_id: {
            usuario_id: user_id,
            post_id: post_id,
          },
        },
      });
    } catch (error) {
      throw new ConflictException('No has dado like a este post');
    }
  }
}
