import { IsInt, IsPositive } from 'class-validator';

export class CreateSeguidorDto {
  @IsInt()
  @IsPositive()
  seguido_id: number;
}
