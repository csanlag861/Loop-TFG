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
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req.cookies?.access_token,
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: PayloadEntity) {
    console.log(payload, 'payload en validate de JWT STRATEGY');

    return {
      userId: Number(payload.id),
      username: payload.username,
    };
  }
}
