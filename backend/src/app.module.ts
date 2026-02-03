import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { UserControllerController } from './modules/user-controller/user-controller.controller';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, PostModule],
  controllers: [UserControllerController],
  providers: [],
})
export class AppModule {}
