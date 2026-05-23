import { IsHexColor, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTecnologiaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  nombre: string;

  @IsOptional()
  @IsHexColor()
  background?: string;

  @IsOptional()
  @IsHexColor()
  border?: string;

  @IsOptional()
  @IsHexColor()
  text?: string;
}
