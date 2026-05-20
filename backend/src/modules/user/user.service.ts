import {
  Injectable,
  HttpException,
  HttpStatus,
  Body,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SlugRol } from '@/common/enums/slug-rol.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolNombreEnum } from '@prisma/client';
import { PayloadEntity } from '../auth/payload';
import { AuthService } from '../auth/auth.service';
import { DEFAULT_AVATAR_URL } from '@/common/constants/default-avatar';
import { SupabaseService } from '../supabase/supabase.service';
import { OAuthProfile } from '../auth/dto/oauth-profile.dto';
import { UserEntity } from '../auth/user';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly supabaseService: SupabaseService,
  ) {}

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
        throw new HttpException(
          'El username ya está en uso.',
          HttpStatus.CONFLICT,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof Error) {
        console.error('Error finding user: ', error);
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    try {
      const emailExists = await this.findUserByEmail(user.email);
      if (emailExists) {
        throw new HttpException(
          'El email ya está en uso.',
          HttpStatus.CONFLICT,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

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
      const rolID = await this.prisma.rol.findUnique({
        where: { slug: SlugRol.USUARIO },
      });
      if (!rolID) {
        throw new HttpException(
          'El rol que intentas asignar no existe',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const createUser = await this.prisma.usuario.create({
        data: {
          nombre: user.nombre,
          username: user.username,
          email: user.email,
          password: hashPassword,
          avatarURL: user.avatarURL || DEFAULT_AVATAR_URL,
          rol_id: rolID.id,
        },
        include: { rol: true },
      });

      // Create default "FAVORITOS" folder for every new user
      await this.prisma.carpeta.create({
        data: {
          usuario_id: createUser.id,
          nombre: 'FAVORITOS',
        },
      });

      const payload: PayloadEntity = {
        username: createUser.username,
        id: createUser.id.toString(),
        rol: createUser.rol.nombre,
      };

      return this.authService.login(createUser as any);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('Error al crear el usuario en la base de datos:', error);
      throw new HttpException(
        'Ocurrió un error inesperado al crear tu cuenta. Por favor, inténtalo de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.prisma.usuario.findFirst({
        where: { email, deletedAt: null },
      });
      return user;
    } catch (error) {
      console.error('Error finding user by email on BBDD: ', error);
      if (error instanceof Error) {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * Busca un usuario por su nombre de usuario.
   * @param username El nombre de usuario a buscar.
   * @returns El usuario encontrado o null si no existe.
   */
  async findUserByUsername(username: string) {
    try {
      const user = await this.prisma.usuario.findFirst({
        where: { username, deletedAt: null },
        include: { rol: true },
      });
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
      const user = await this.prisma.usuario.findUnique({
        where: { id, deletedAt: null },
      });
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

  /**
   * Función para obtener los datos del usuario.
   * @param id Identificador del usuario
   * @returns Devuelve los datos del usuario.
   */
  async getProfileData(user_id: number, requestUser_id?: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: user_id, deletedAt: null },
      select: {
        avatarURL: true,
        nombre: true,
        username: true,
        id: true,
        biografia: true,
        rol: { select: { nombre: true, slug: true } },
      },
    });

    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const [isFollowing, seguidoresCount, seguidosCount] = await Promise.all([
      requestUser_id
        ? this.prisma.seguidor
            .findUnique({
              where: {
                seguidor_id_seguido_id: {
                  seguidor_id: requestUser_id,
                  seguido_id: user.id,
                },
              },
            })
            .then(Boolean)
        : Promise.resolve(false),
      this.prisma.seguidor.count({ where: { seguido_id: user.id } }),
      this.prisma.seguidor.count({ where: { seguidor_id: user.id } }),
    ]);

    return {
      ...user,
      isOwner: requestUser_id ? requestUser_id === user.id : false,
      isAdmin: user.rol.nombre === RolNombreEnum.ADMIN,
      isFollowing,
      seguidoresCount,
      seguidosCount,
    };
  }

  async updateUser(
    user_id: number,
    dto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (dto.username) {
      const usernameExists = await this.findUserByUsername(dto.username);
      if (usernameExists && usernameExists.id !== user_id) {
        throw new HttpException('Username ya en uso', HttpStatus.CONFLICT);
      }
    }

    let avatarURL = user.avatarURL;
    if (file) {
      console.log(
        '[Backend Service] File detected, starting upload to Supabase...',
      );
      const upload = await this.supabaseService.uploadAvatar(file, user_id);
      console.log(
        '[Backend Service] Upload successful, new URL:',
        upload.publicURL,
      );
      avatarURL = upload.publicURL as string;

      if (user.avatarURL && !user.avatarURL.includes(DEFAULT_AVATAR_URL)) {
        const oldAvatar = user.avatarURL.split('/').pop();
        if (oldAvatar) {
          await this.supabaseService.deleteAvatar(oldAvatar);
        }
      }
    }

    const updatedData = {
      ...dto,
      avatarURL,
      ...(dto.password && { password: await this.hashPassword(dto.password) }),
    };

    const updated = await this.prisma.usuario.update({
      where: { id: user_id },
      data: updatedData,
      select: {
        id: true,
        nombre: true,
        username: true,
        biografia: true,
        avatarURL: true,
      },
    });

    return updated;
  }

  async findOrCreateOAuthUser(profile: OAuthProfile): Promise<UserEntity> {
    let user = await this.prisma.usuario.findFirst({
      where: { providerId: profile.providerId, provider: profile.provider },
      include: { rol: true },
    });
    if (user) return user as unknown as UserEntity;

    user = await this.prisma.usuario.findUnique({
      where: { email: profile.email },
      include: { rol: true },
    });
    if (user) {
      return user as unknown as UserEntity;
    }

    const baseUsername = profile.email.split('@')[0];
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);

    const newOAuthUser = await this.prisma.usuario.create({
      data: {
        email: profile.email,
        nombre: profile.firstName || 'Usuario',
        username: `${baseUsername}${uniqueSuffix}`,
        biografia: profile.lastName || '',
        avatarURL: profile.avatar,
        provider: profile.provider,
        providerId: profile.providerId,
        rol_id: (
          await this.prisma.rol.findFirstOrThrow({
            where: { slug: SlugRol.USUARIO },
          })
        ).id,
        password: null,
      },
      include: { rol: true },
    });

    // Create default "FAVORITOS" folder for every new OAuth user
    await this.prisma.carpeta.create({
      data: {
        usuario_id: newOAuthUser.id,
        nombre: 'FAVORITOS',
      },
    });

    return newOAuthUser as unknown as UserEntity;
  }
}
