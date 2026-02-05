import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(280)
  @IsNotEmpty()
  contenido: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tecnologias: number[];
}
