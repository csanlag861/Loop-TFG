import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { secret } from '@/common/jwt/jwt-sign';
import { PayloadEntity } from '../payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies?.access_token
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: PayloadEntity) {
    return {
      userId: payload.sub,
      username: payload.username,
      rolId: payload.rolId,
    };
  }
}
