import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTecnologiaDto {
  @IsString()
  @IsNotEmpty()
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
