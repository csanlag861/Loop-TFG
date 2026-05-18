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

  async getSeguidores(
    user_id: number,
    cursor?: number,
    request_user_id?: number,
  ) {
    const take = 10;

    const where = {
      seguido_id: user_id,
      ...(cursor && { id: { lt: cursor } }),
    };

    // eslint-disable-next-line prefer-const
    let [seguidores, count] = await this.prisma.$transaction([
      this.prisma.seguidor.findMany({
        where,
        take: take + 1,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        include: {
          seguidor: {
            select: {
              id: true,
              username: true,
              nombre: true,
              avatarURL: true,
            },
          },
        },
      }),
      this.prisma.seguidor.count({ where }),
    ]);

    const hasNextPage = seguidores.length > take;
    seguidores = hasNextPage ? seguidores.slice(0, -1) : seguidores;

    // Determinar si el usuario autenticado sigue a cada seguidor
    let followingIds: Set<number> = new Set();
    if (request_user_id) {
      const follows = await this.prisma.seguidor.findMany({
        where: {
          seguidor_id: request_user_id,
          seguido_id: {
            in: seguidores.map((s) => s.seguidor.id),
          },
        },
        select: { seguido_id: true },
      });
      followingIds = new Set(follows.map((f) => f.seguido_id));
    }

    return {
      list: seguidores.map((s) => ({
        id: s.seguidor.id,
        username: s.seguidor.username,
        nombre: s.seguidor.nombre,
        avatarURL: s.seguidor.avatarURL,
        isFollowing: followingIds.has(s.seguidor.id),
      })),
      metadata: {
        count,
        hasNextPage,
        cursor: seguidores.at(-1)?.id,
      },
    };
  }

  async getSeguidos(
    user_id: number,
    cursor?: number,
    request_user_id?: number,
  ) {
    const take = 10;

    const where = {
      seguidor_id: user_id,
      ...(cursor && { id: { lt: cursor } }),
    };

    // eslint-disable-next-line prefer-const
    let [seguidos, count] = await this.prisma.$transaction([
      this.prisma.seguidor.findMany({
        where,
        take: take + 1,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        include: {
          seguido: {
            select: {
              id: true,
              username: true,
              nombre: true,
              avatarURL: true,
            },
          },
        },
      }),
      this.prisma.seguidor.count({ where }),
    ]);

    const hasNextPage = seguidos.length > take;
    seguidos = hasNextPage ? seguidos.slice(0, -1) : seguidos;

    let followingIds: Set<number> = new Set();
    if (request_user_id) {
      const follows = await this.prisma.seguidor.findMany({
        where: {
          seguidor_id: request_user_id,
          seguido_id: {
            in: seguidos.map((s) => s.seguido.id),
          },
        },
        select: { seguido_id: true },
      });
      followingIds = new Set(follows.map((f) => f.seguido_id));
    }

    return {
      list: seguidos.map((s) => ({
        id: s.seguido.id,
        username: s.seguido.username,
        nombre: s.seguido.nombre,
        avatarURL: s.seguido.avatarURL,
        isFollowing: followingIds.has(s.seguido.id),
      })),
      metadata: {
        count,
        hasNextPage,
        cursor: seguidos.at(-1)?.id,
      },
    };
  }
}
