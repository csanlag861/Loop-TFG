import { UsuarioEstadoEnum } from '@/common/enums/usuario-estado.enum';
import { Rol } from '@prisma/client';
export class UserEntity {
  id: number;
  nombre: string;
  username: string;
  email: string;
  biografia?: string;
  avatarURL?: string;
  estado: UsuarioEstadoEnum;
  rolId: number;
  password: string;
  rol: Rol;
}
