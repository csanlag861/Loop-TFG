import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCarpetaDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nombre: string;
}
