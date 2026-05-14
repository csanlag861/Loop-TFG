import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { OAuthProfile } from '../dto/oauth-profile.dto';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL as string,
      scope: ['user:email'] as string[],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const { id, username, emails, photos } = profile;

    const userProfile: OAuthProfile = {
      provider: 'GITHUB',
      providerId: id,
      email: emails[0].value,
      firstName: username,
      lastName: '',
      avatar: photos[0]?.value,
    };
    done(null, userProfile);
  }
}
