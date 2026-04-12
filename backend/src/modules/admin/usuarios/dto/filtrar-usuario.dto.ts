import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
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

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  eliminados: boolean = false;
}
