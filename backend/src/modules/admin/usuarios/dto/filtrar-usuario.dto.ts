import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { RolNombreEnum, UsuarioEstadoEnum } from '@prisma/client';

export class FiltrarUsuarioDto {
  @IsOptional()
  @IsString()
  busqueda?: string;

  @IsOptional()
  @IsEnum(RolNombreEnum)
  rol?: RolNombreEnum;

  @IsOptional()
  @IsEnum(UsuarioEstadoEnum)
  estado?: UsuarioEstadoEnum;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pagina: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limite: number = 20;
}
