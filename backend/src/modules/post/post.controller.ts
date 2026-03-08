import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { PostOwnerGuard } from './guards/post-owner.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createPostDto: CreatePostDto, @User('userId') userId: number) {
    console.log('user id', userId);

    return this.postService.create(createPostDto, userId);
  }

  @Get('getAll')
  findAll(
    @Query('cursor', new ParseIntPipe({ optional: true })) cursor?: number,
  ) {
    return this.postService.findAll(cursor);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const postId = Number(id);
    if (isNaN(postId)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
    return this.postService.findOne(postId);
  }

  @Get(':id/posts')
  getPostsFromUser(@Param('id') id: string) {
    const usuario_id = Number(id);
    if (isNaN(usuario_id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
    return this.postService.getPostsFromUser(usuario_id);
  }

  @UseGuards(JwtAuthGuard, PostOwnerGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard, PostOwnerGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
