import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CarpetaService } from './carpeta.service';
import { CreateCarpetaDto } from './dto/create-carpeta.dto';
import { UpdateCarpetaDto } from './dto/update-carpeta.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('carpeta')
export class CarpetaController {
  constructor(private readonly carpetaService: CarpetaService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @User('userId') user_id: number,
    @Body() createCarpetaDto: CreateCarpetaDto,
  ) {
    return this.carpetaService.create(user_id, createCarpetaDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@User('userId') user_id: number) {
    return this.carpetaService.findAll(user_id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id', ParseIntPipe) carpeta_id: number,
    @User('userId') user_id: number,
  ) {
    return this.carpetaService.findOne(user_id, carpeta_id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) carpeta_id: number,
    @User('userId') user_id: number,
    @Body() updateCarpetaDto: UpdateCarpetaDto,
  ) {
    return this.carpetaService.update(carpeta_id, user_id, updateCarpetaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id', ParseIntPipe) carpeta_id: number,
    @User('userId') user_id: number,
    @Query('eliminar') eliminar: string,
  ) {
    return this.carpetaService.remove(carpeta_id, user_id, eliminar === 'true');
  }
}
