// src/admin/usuarios/dto/cambiar-rol.dto.ts
import { IsEnum } from 'class-validator';
import { RolNombreEnum } from '@prisma/client';

export class CambiarRolDto {
  @IsEnum(RolNombreEnum)
  rol: RolNombreEnum;
}
