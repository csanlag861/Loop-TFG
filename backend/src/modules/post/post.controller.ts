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
import { JwtAuthOptionalGuard } from '../auth/guards/jwt-auth-optional.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createPostDto: CreatePostDto, @User('userId') userId: number) {
    console.log('user id', userId);

    return this.postService.create(createPostDto, userId);
  }

  @UseGuards(JwtAuthOptionalGuard)
  @Get('getAll')
  findAll(
    @Query('cursor', new ParseIntPipe({ optional: true })) cursor?: number,
    @User('userId') user_id?: number,
    @Query('search') search?: string,
    @Query('username') username?: string,
    @Query('tech') tech?: string,
  ) {
    return this.postService.findAll(cursor, user_id, search, username, tech);
  }

  @UseGuards(JwtAuthOptionalGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @User('userId') user_id?: number,
  ) {
    return this.postService.findOne(id, user_id);
  }

  @Get(':id/comments')
  findComments(
    @Param('id', ParseIntPipe) id: number,
    @Query('cursor', new ParseIntPipe({ optional: true })) cursor?: number,
  ) {
    return this.postService.findByPost(id, cursor);
  }

  @Get(':id/posts')
  getPostsFromUser(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostsFromUser(id);
  }

  @UseGuards(JwtAuthGuard, PostOwnerGuard)
  @Patch('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard, PostOwnerGuard)
  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(+id);
  }
}
