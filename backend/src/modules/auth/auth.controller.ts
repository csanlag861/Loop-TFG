import {
  Request,
  Req,
  Res,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { User } from './decorators/user.decorator';
import type { Response } from 'express';
import type { OAuthProfile } from './dto/oauth-profile.dto';
import { GithubOauthGuard } from './guards/github-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.authService.login(req.user);
  }

  @Post('/refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(
    @User() profile: OAuthProfile,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.handleOAuthLogin(profile);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
    return res.redirect(
      `${frontendUrl}/auth/callback?token=${accessToken}&refreshToken=${refreshToken}`,
    );
  }

  @Get('github')
  @UseGuards(GithubOauthGuard)
  async githubAuth() {}
  @Get('github/redirect')
  @UseGuards(GithubOauthGuard)
  async githubAuthRedirect(
    @User() profile: OAuthProfile,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.handleOAuthLogin(profile);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
    return res.redirect(
      `${frontendUrl}/auth/callback?token=${accessToken}&refreshToken=${refreshToken}`,
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.authService.requestPasswordReset(email);
    return { success: true };
  }
  @Post('reset-password')
  async resetPassword(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { token, newPassword } = body;
    await this.authService.resetPassword(token, newPassword);
    return { success: true };
  }
}
