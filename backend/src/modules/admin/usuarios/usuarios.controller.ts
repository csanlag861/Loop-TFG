import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FiltrarUsuarioDto } from './dto/filtrar-usuario.dto';
import { User } from '@/modules/auth/decorators/user.decorator';
import { CambiarEstadoDto } from './dto/cambiar-estado.dto';
import { CambiarRolDto } from './dto/cambiar-rol.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  /*   @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  } */

  @Get()
  findAll(@Query() filtros: FiltrarUsuarioDto) {
    return this.usuariosService.findAll(filtros);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id/rol')
  updateRol(@Param('id', ParseIntPipe) id: number, @Body() dto: CambiarRolDto) {
    return this.usuariosService.updateRol(id, dto);
  }

  @Patch(':id/estado')
  updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CambiarEstadoDto,
  ) {
    return this.usuariosService.updateEstado(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // DUDA
  eliminar(
    @Param('id', ParseIntPipe) id: number,
    @User('userId') admin_id: number,
  ) {
    return this.usuariosService.eliminar(id, admin_id);
  }
}
