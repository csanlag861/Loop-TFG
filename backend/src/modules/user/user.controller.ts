import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@User('userId') userId: number) {
    return this.userService.getUserData(userId);
  }

  @Get('profile/:userId')
  getProfile(@Param('userId') userId: number) {
    return this.userService.getUserData(userId);
  }
}
