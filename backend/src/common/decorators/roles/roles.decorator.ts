import { SetMetadata } from '@nestjs/common';
import { RolNombreEnum } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...args: RolNombreEnum[]) => SetMetadata(ROLES_KEY, args);
