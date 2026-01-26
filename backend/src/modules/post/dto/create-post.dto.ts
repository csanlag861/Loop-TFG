import {
  IsArray,
  IsInt,
  IsNotEmpty,
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
  tecnologias: number[];
}
