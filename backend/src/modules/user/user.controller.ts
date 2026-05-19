import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { JwtAuthOptionalGuard } from '../auth/guards/jwt-auth-optional.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

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
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
      limits: {
        fileSize: 1024 * 1024 * 2,
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException('Solo se permiten archivos de imagen'),
            false,
          );
        }
      },
    }),
  )
  updateProfile(
    @User('userId') user_id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log('[Backend Controller] Received DTO:', dto);
    console.log(
      '[Backend Controller] Received File:',
      file ? `${file.originalname} (${file.size} bytes)` : 'No file',
    );
    return this.userService.updateUser(user_id, dto, file);
  }

  @Get('check-username/:username')
  async checkUsername(@Param('username') username: string) {
    const user = await this.userService.findUserByUsername(username);
    return { available: !user };
  }

  @Get('check-email/:email')
  async checkEmail(@Param('email') email: string) {
    const user = await this.userService.findUserByEmail(email);
    return { available: !user };
  }
}
