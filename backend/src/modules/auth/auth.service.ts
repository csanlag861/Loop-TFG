import {
  Injectable,
  Body,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './user';
import { JwtService } from '@nestjs/jwt';
import { PayloadEntity } from './payload';
import { OAuthProfile } from './dto/oauth-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
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
    const payload: PayloadEntity = {
      username: user.username,
      id: user.id.toString(),
      rol: user.rol.nombre,
    };

    const accessToken = this.signAccessToken(payload);
    const refreshToken = this.signRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  signAccessToken(payload: PayloadEntity): string {
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  signRefreshToken(payload: PayloadEntity): string {
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<PayloadEntity>(refreshToken);
      const { iat, exp, ...newPayload } = payload as any;

      const newAccessToken = this.signAccessToken(newPayload as PayloadEntity);
      const newRefreshToken = this.signRefreshToken(
        newPayload as PayloadEntity,
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new HttpException(
        'Refresh token inválido o expirado',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  loginOAuthUser(user: UserEntity) {
    const payload: PayloadEntity = {
      username: user.username,
      id: user.id.toString(),
      rol: user.rol.nombre,
    };

    const accessToken = this.signAccessToken(payload);
    const refreshToken = this.signRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  async handleOAuthLogin(profile: OAuthProfile) {
    const user = await this.userService.findOrCreateOAuthUser(profile);

    return this.loginOAuthUser(user);
  }

  
}
