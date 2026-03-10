import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CarpetaModule } from './modules/carpeta/carpeta.module';
import { GuardadosModule } from './modules/guardados/guardados.module';
import { TecnologiaModule } from './modules/tecnologia/tecnologia.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
    GuardadosModule,
    CarpetaModule,
    TecnologiaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
