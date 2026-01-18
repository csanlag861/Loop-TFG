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

  login(user: UserEntity) {
    const payload: PayloadEntity = {
      username: user.username,
      sub: user.id,
      rolId: user.rolId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
