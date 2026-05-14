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
} from '@nestjs/common';
import { SeguidorService } from './seguidor.service';
import { User } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class SeguidorController {
  constructor(private readonly seguidorService: SeguidorService) {}

  @Post(':id/seguir')
  async toggleSeguidor(
    @User('userId') user_id: number,
    @Param('id', ParseIntPipe) seguido_id: number,
  ) {
    console.log(user_id, 'User ID');
    console.log(seguido_id, 'Seguido ID');

    return this.seguidorService.toggleSeguidor(seguido_id, user_id);
  }

  @Get(':id/check')
  async checkSeguidor(
    @User('userId') user_id: number,
    @Param('id') seguido_id: number,
  ) {
    return this.seguidorService.checkSeguidor(seguido_id, user_id);
  }
}
