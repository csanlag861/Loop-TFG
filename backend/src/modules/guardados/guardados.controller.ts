import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { GuardadosService } from './guardados.service';
import { CreateGuardadoDto } from './dto/create-guardado.dto';
import { UpdateGuardadoDto } from './dto/update-guardado.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('guardados')
export class GuardadosController {
  constructor(private readonly guardadosService: GuardadosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @User('userId') user_id: number,
    @Body() createGuardadoDto: CreateGuardadoDto,
  ) {
    return this.guardadosService.create(user_id, createGuardadoDto);
  }

  @Patch(':id/mover')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) guardado_id: number,
    @User('userId') user_id: number,
    @Body() updateGuardadoDto: UpdateGuardadoDto,
  ) {
    return this.guardadosService.update(
      guardado_id,
      user_id,
      updateGuardadoDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id', ParseIntPipe) guardado_id: number,
    @User('userId') user_id: number,
  ) {
    return this.guardadosService.remove(guardado_id, user_id);
  }
}
