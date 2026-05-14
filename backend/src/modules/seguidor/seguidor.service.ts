import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { Seguidor } from '@prisma/client';

@Injectable()
export class SeguidorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async toggleSeguidor(seguido_id: number, user_id: number) {
    if (seguido_id === user_id) {
      throw new BadRequestException('No puedes seguirte a ti mismo.');
    }

    const user = await this.userService.getUserById(seguido_id);
    if (!user) {
      throw new NotFoundException(
        'El usuario al que intentas seguir no existe.',
      );
    }

    const seguidorExistente = await this.findSeguidor(seguido_id, user_id);
    if (seguidorExistente) {
      try {
        await this.deleteSeguidor(seguido_id, user_id);
        return {
          isFollowing: false,
          message: 'Has dejado de seguir a este usuario',
        };
      } catch (error) {
        console.error(error, 'Error al dejar de seguir');

        throw new BadRequestException(
          'Hemos detectado un problema, inténtalo más tarde.',
        );
      }
    } else {
      try {
        await this.createSeguidor(seguido_id, user_id);
        return {
          isFollowing: true,
          message: 'Has empezado a seguir a este usuario',
        };
      } catch (error) {
        console.error(error, 'Error al empezar a seguir');

        throw new BadRequestException(
          'Hemos detectado un problema, inténtalo más tarde.',
        );
      }
    }
  }

  private async findSeguidor(
    seguido_id: number,
    user_id: number,
  ): Promise<Seguidor | null> {
    return await this.prisma.seguidor.findUnique({
      where: {
        seguidor_id_seguido_id: { seguidor_id: user_id, seguido_id },
      },
    });
  }

  private async createSeguidor(seguido_id: number, user_id: number) {
    return this.prisma.seguidor.create({
      data: {
        seguido_id,
        seguidor_id: user_id,
      },
    });
  }

  private async deleteSeguidor(seguido_id: number, user_id: number) {
    return this.prisma.seguidor.delete({
      where: {
        seguidor_id_seguido_id: { seguidor_id: user_id, seguido_id },
      },
    });
  }

  async checkSeguidor(seguido_id: number, user_id: number) {
    const seguidor = await this.findSeguidor(seguido_id, user_id);
    return { isFollowing: !!seguidor };
  }

  async countSeguidores(user_id: number) {
    return this.prisma.seguidor.count({
      where: { seguido_id: user_id },
    });
  }

  async countSeguidos(user_id: number) {
    return this.prisma.seguidor.count({
      where: {
        seguidor_id: user_id,
      },
    });
  }
}
