// src/admin/usuarios/dto/cambiar-estado.dto.ts
import { IsEnum } from 'class-validator';
import { UsuarioEstadoEnum } from '@prisma/client';

export class CambiarEstadoDto {
  @IsEnum(UsuarioEstadoEnum)
  estado: UsuarioEstadoEnum;
}
