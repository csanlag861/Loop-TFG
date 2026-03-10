import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TecnologiaService } from './tecnologia.service';
import { CreateTecnologiaDto } from './dto/create-tecnologia.dto';
import { UpdateTecnologiaDto } from './dto/update-tecnologia.dto';
import { Tecnologia } from '@prisma/client';

@Controller('tecnologia')
export class TecnologiaController {
  constructor(private readonly tecnologiaService: TecnologiaService) { }

  @Post()
  create(@Body() createTecnologiaDto: CreateTecnologiaDto) {
    return this.tecnologiaService.create(createTecnologiaDto);
  }

  @Get()
  getTecnologias(): Promise<Tecnologia[]> {
    return this.tecnologiaService.getTecnologias();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tecnologiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTecnologiaDto: UpdateTecnologiaDto) {
    return this.tecnologiaService.update(+id, updateTecnologiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tecnologiaService.remove(+id);
  }
}
