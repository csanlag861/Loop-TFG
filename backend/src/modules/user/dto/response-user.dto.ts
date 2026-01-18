import { UsuarioEstadoEnum } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ResponseUserDto {
  id: number;
  nombre: string;
  username: string;
  email: string;
  biografia?: string;
  avatarURL?: string;
  estado: UsuarioEstadoEnum;
  rolId: number;

  @Exclude()
  password: string;
}
