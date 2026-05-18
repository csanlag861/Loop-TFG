import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SeguidorService } from './seguidor.service';
import { User } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtAuthOptionalGuard } from '../auth/guards/jwt-auth-optional.guard';

@Controller('user')
export class SeguidorController {
  constructor(private readonly seguidorService: SeguidorService) {}

  @Post(':id/seguir')
  @UseGuards(JwtAuthGuard)
  async toggleSeguidor(
    @User('userId') user_id: number,
    @Param('id', ParseIntPipe) seguido_id: number,
  ) {
    console.log(user_id, 'User ID');
    console.log(seguido_id, 'Seguido ID');

    return this.seguidorService.toggleSeguidor(seguido_id, user_id);
  }

  @Get(':id/check')
  @UseGuards(JwtAuthOptionalGuard)
  async checkSeguidor(
    @User('userId') user_id: number,
    @Param('id') seguido_id: number,
  ) {
    return this.seguidorService.checkSeguidor(seguido_id, user_id);
  }

  @Get(':id/seguidores')
  @UseGuards(JwtAuthOptionalGuard)
  async getSeguidores(
    @Param('id', ParseIntPipe) user_id: number,
    @Query('cursor', new ParseIntPipe({ optional: true })) cursor?: number,
    @User('userId') request_user_id?: number,
  ) {
    return this.seguidorService.getSeguidores(user_id, cursor, request_user_id);
  }
  @Get(':id/seguidos')
  @UseGuards(JwtAuthOptionalGuard)
  async getSeguidos(
    @Param('id', ParseIntPipe) user_id: number,
    @Query('cursor', new ParseIntPipe({ optional: true })) cursor?: number,
    @User('userId') request_user_id?: number,
  ) {
    return this.seguidorService.getSeguidos(user_id, cursor, request_user_id);
  }
}
