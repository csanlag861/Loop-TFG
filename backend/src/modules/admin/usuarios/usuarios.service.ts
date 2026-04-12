import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { FiltrarUsuarioDto } from './dto/filtrar-usuario.dto';
import { CambiarRolDto } from './dto/cambiar-rol.dto';
import { CambiarEstadoDto } from './dto/cambiar-estado.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filtros: FiltrarUsuarioDto) {
    const { busqueda, rol, estado, pagina, limite, eliminados } = filtros;
    const skip = (pagina - 1) * limite;

    const where = {
      deletedAt: eliminados ? { not: null } : null,
      ...(busqueda && {
        OR: [
          { username: { contains: busqueda, mode: 'insensitive' as const } },
          { email: { contains: busqueda, mode: 'insensitive' as const } },
          { nombre: { contains: busqueda, mode: 'insensitive' as const } },
        ],
      }),
      ...(rol && { rol: { nombre: rol } }),
      ...(estado && { estado }),
    };

    const [usuarios, total] = await Promise.all([
      this.prisma.usuario.findMany({
        where,
        skip,
        take: limite,
        select: {
          id: true,
          nombre: true,
          username: true,
          email: true,
          estado: true,
          createdAt: true,
          avatarURL: true,
          deletedAt: true,
          rol: { select: { nombre: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.usuario.count({ where }),
    ]);

    return {
      data: usuarios,
      meta: {
        total,
        pagina,
        limite,
        totalPaginas: Math.ceil(total / limite),
      },
    };
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        nombre: true,
        username: true,
        email: true,
        biografia: true,
        estado: true,
        createdAt: true,
        avatarURL: true,
        deletedAt: true,
        rol: { select: { nombre: true } },
        _count: {
          select: { posts: true, carpetas: true },
        },
      },
    });

    if (!usuario || usuario.deletedAt)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async updateRol(id: number, cambiarRolDto: CambiarRolDto) {
    await this.findOne(id);

    const rol = await this.prisma.rol.findUnique({
      where: { nombre: cambiarRolDto.rol },
    });

    if (!rol) throw new HttpException('Rol no válido', HttpStatus.BAD_REQUEST);

    return this.prisma.usuario.update({
      where: { id },
      data: { rol_id: rol.id },
      select: { id: true, username: true, rol: { select: { nombre: true } } },
    });
  }

  async updateEstado(id: number, cambiarEstadoDto: CambiarEstadoDto) {
    await this.findOne(id);

    return this.prisma.usuario.update({
      where: { id },
      data: { estado: cambiarEstadoDto.estado },
      select: { id: true, username: true, estado: true },
    });
  }

  async eliminar(id: number, admin_id: number) {
    await this.findOne(id);

    if (id === admin_id) {
      throw new HttpException(
        'No puedes eliminar a un administrador.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.usuario.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restaurar(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: { id: true, deletedAt: true },
    });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    if (!usuario.deletedAt) {
      throw new HttpException(
        'El usuario no está eliminado',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.usuario.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}
