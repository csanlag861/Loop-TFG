import { Request, Req, Res, Body, Controller, Get, Post, UseGuards, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const logger = new Logger('App - Auth');

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @Post('/register')
  async register(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() req, @Res({ passthrough: true }) res) {
    logger.log(`Usuario ${req.user.username} ha iniciado sesión.`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.authService.login(req.user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.userService.getUserById(req.user.userId);
  }
}
