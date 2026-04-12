import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TecnologiaService } from './tecnologia.service';
import { CreateTecnologiaDto } from './dto/create-tecnologia.dto';
import { UpdateTecnologiaDto } from './dto/update-tecnologia.dto';
import { RolNombreEnum, Tecnologia } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles/roles.guard';
import { Roles } from '@/common/decorators/roles/roles.decorator';

@Controller('tecnologia')
export class TecnologiaController {
  constructor(private readonly tecnologiaService: TecnologiaService) {}

  @Get()
  getTecnologias(): Promise<Tecnologia[]> {
    return this.tecnologiaService.getTecnologias();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolNombreEnum.ADMIN)
  @Post()
  create(
    @Body() createTecnologiaDto: CreateTecnologiaDto,
  ): Promise<Tecnologia> {
    return this.tecnologiaService.create(createTecnologiaDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolNombreEnum.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTecnologiaDto: UpdateTecnologiaDto,
  ) {
    return this.tecnologiaService.update(id, updateTecnologiaDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolNombreEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tecnologiaService.remove(id);
  }
}
