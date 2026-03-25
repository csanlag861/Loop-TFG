import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { JwtAuthOptionalGuard } from '../auth/guards/jwt-auth-optional.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@User('userId') user_id: number) {
    return this.userService.getProfileData(user_id);
  }

  @UseGuards(JwtAuthOptionalGuard)
  @Get('profile/:userId')
  getProfile(
    @Param('userId') user_id: number,
    @User('userId') requestUser_id?: number,
  ) {
    return this.userService.getProfileData(user_id, requestUser_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@User('userId') user_id: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(user_id, dto);
  }
}
