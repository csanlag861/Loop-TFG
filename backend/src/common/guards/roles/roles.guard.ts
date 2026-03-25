import { ROLES_KEY } from '@/common/decorators/roles/roles.decorator';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolNombreEnum } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolesRequeridos = this.reflector.getAllAndOverride<RolNombreEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rolesRequeridos) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!rolesRequeridos.includes(user.rol)) {
      throw new HttpException(
        'No tienes permisos para realizar esta accion',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
