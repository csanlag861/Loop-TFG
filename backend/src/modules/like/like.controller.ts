import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';

@Controller('like')
@UseGuards(JwtAuthGuard)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':post_id')
  async likePost(
    @Param('post_id', ParseIntPipe) post_id: number,
    @User('userId') user_id: number,
  ) {
    return this.likeService.likePost(post_id, user_id);
  }

  @Delete(':post_id')
  async unlikePost(
    @Param('post_id', ParseIntPipe) post_id: number,
    @User('userId') user_id: number,
  ) {
    return this.likeService.unlikePost(post_id, user_id);
  }
}
