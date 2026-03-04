import { IsInt, IsPositive } from 'class-validator';

export class CreateGuardadoDto {
  @IsInt()
  @IsPositive()
  post_id: number;

  @IsInt()
  @IsPositive()
  carpeta_id: number;
}
