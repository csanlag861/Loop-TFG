import { RolNombreEnum } from '@prisma/client';

export class PayloadEntity {
  id: string;
  username: string;
  rol: RolNombreEnum;
}
