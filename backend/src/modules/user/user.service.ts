import { Injectable, HttpException, HttpStatus, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param user Datos del usuario a crear.
   * @returns El usuario creado.
   */
  async createUser(user: CreateUserDto) {
    // Buscamos si el username ya está registrado en la base de datos.
    try {
      const userExists = await this.findUserByUsername(user.username);
      if (userExists) {
        throw new HttpException('Conflict', HttpStatus.CONFLICT);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error finding user: ', error);
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // Si no existe, procedemos a crear el usuario.
    try {
      const hashPassword = await this.hashPassword(user.password);
      const createUser = await this.prisma.usuario.create({
        data: {
          nombre: user.nombre,
          username: user.username,
          email: user.email,
          password: hashPassword,
          biografia: user.biografia,
          avatarURL: user.avatarURL,
        },
      });

      const resUser: ResponseUserDto = {
        id: createUser.id,
        nombre: createUser.nombre,
        username: createUser.username,
        password: createUser.password,
        email: createUser.email,
        biografia: createUser.biografia ?? undefined,
        avatarURL: createUser.avatarURL ?? undefined,
        estado: createUser.estado,
        rolId: createUser.rolId,
      };

      return resUser;
    } catch (error) {
      console.error('Error creating user: ', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Busca un usuario por su nombre de usuario.
   * @param username El nombre de usuario a buscar.
   * @returns El usuario encontrado o null si no existe.
   */
  async findUserByUsername(username: string) {
    try {
      const user = await this.prisma.usuario.findFirst({ where: { username } });
      return user;
    } catch (error) {
      console.error('Error finding user by username on BBDD: ', error);
      if (error instanceof Error) {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.prisma.usuario.findUnique({ where: { id } });
      if (!user) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
    }
  }

  /**
   * Función para hashear una contraseña utilizando bcrypt.
   * @param password La contraseña en texto plano.
   * @returns La contraseña hasheada.
   */
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
