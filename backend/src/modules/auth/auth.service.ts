/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import * as crypto from 'crypto';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { inngest } from '@/lib/inngest/client';
import { ResetPasswordEmail } from '@/emails/ResetPasswordEmail';

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

  refreshTokens(refreshToken: string) {
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
      if (error instanceof HttpException) {
        throw error;
      }
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
    try {
      const user = await this.userService.findOrCreateOAuthUser(profile);
      return this.loginOAuthUser(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error interno al iniciar sesión con OAuth',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async requestPasswordReset(email: string): Promise<boolean> {
    try {
      const usuario = await this.userService.findUserByEmail(email);
      if (!usuario) return true;

      const nonce = crypto.randomBytes(32).toString('hex');
      await this.userService.updateUser(usuario.id, {
        passwordResetNonce: nonce,
      });

      const token = this.jwtService.sign(
        { sub: usuario.id, nonce: nonce },
        { expiresIn: '30m', secret: process.env.JWT_SECRET },
      );

      const resetLink = `${process.env.FRONTEND_URL}/reset_password/${token}`;
      try {
        await inngest.send({
          name: 'app/password.password-reset',
          data: { email: usuario.email, resetLink },
        });
      } catch (error) {
        console.error('Inngest falló, ejecutando Fallback', error);
        const resend = new Resend(process.env.RESEND_API_KEY);
        const html = await render(ResetPasswordEmail({ resetLink }));
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: usuario.email,
          subject: 'Recupera tu contraseña - Loop',
          html: html,
        });
      }
      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error interno al solicitar el reseteo de contraseña',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const { sub: userId, nonce } = payload;
      const usuario = await this.userService.getUserById(userId);

      if (!usuario || usuario.passwordResetNonce !== nonce) {
        throw new Error('Token inválido o ya utilizado.');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userService.updateUser(userId, {
        password: hashedPassword,
        passwordResetNonce: null,
      });
      return true;
    } catch (error) {
      throw new Error('Link expirado o inválido.');
    }
  }
}
