import { PrismaService } from '@/modules/prisma/prisma.service';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class PostOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId: number = request.user.userId;
    const postId = Number(request.params.id);

    if (!postId) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { usuario_id: true },
    });

    if (!post) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    if (post.usuario_id !== userId) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
