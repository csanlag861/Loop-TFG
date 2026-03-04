import { IsInt, IsPositive } from 'class-validator';

export class UpdateGuardadoDto {
  @IsInt()
  @IsPositive()
  carpeta_id: number;
}
