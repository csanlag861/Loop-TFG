import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateComentarioDto {
  @IsInt()
  post_id: number;

  @IsString()
  @MaxLength(280)
  contenido: string;

  @IsOptional()
  @IsInt()
  parent_id?: number;
}
