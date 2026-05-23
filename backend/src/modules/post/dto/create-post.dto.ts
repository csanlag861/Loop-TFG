import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @MaxLength(280)
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value?.trim())
  contenido: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tecnologias: number[];
}
