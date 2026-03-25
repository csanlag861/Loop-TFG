import { Injectable, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './user';
import { JwtService } from '@nestjs/jwt';
import { PayloadEntity } from './payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Valida un usuario con la información proporcionada.
   * @param user Datos de inicio de sesión del usuario.
   * @returns Información del usuario si las credenciales son válidas; y si no, undefined.
   */
  async validateUser(user: LoginDto) {
    try {
      const userResult = await this.userService.findUserByUsername(
        user?.username,
      );
      const passwordMatch = await bcrypt.compare(
        user.password,
        userResult?.password || '',
      );

      if (userResult && passwordMatch) {
        const { password, ...result } = userResult;
        return result;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * Genera un token JWT para el usuario autenticado.
   * @param user Información del usuario autenticado.
   * @returns Objeto con el token JWT.
   */
  login(user: UserEntity) {
    console.log("USER que llega ", user);
    
    const payload: PayloadEntity = {
      username: user.username,
      id: user.id.toString(),
      rol: user.rol.nombre,
    };
    const token = this.jwtService.sign(payload);

    return token;
  }
}
