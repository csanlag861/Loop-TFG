import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CarpetaModule } from './modules/carpeta/carpeta.module';
import { GuardadosModule } from './modules/guardados/guardados.module';
import { TecnologiaModule } from './modules/tecnologia/tecnologia.module';
import { UsuariosModule } from './modules/admin/usuarios/usuarios.module';
import { LikeModule } from './modules/like/like.module';
import { SupabaseService } from './modules/supabase/supabase.service';
import { ComentariosModule } from './modules/comentarios/comentarios.module';
import { SeguidorModule } from './modules/seguidor/seguidor.module';
import { InngestController } from './modules/inngest/inngest.controller';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
    GuardadosModule,
    CarpetaModule,
    TecnologiaModule,
    UsuariosModule,
    LikeModule,
    ComentariosModule,
    SeguidorModule,
  ],
  controllers: [InngestController],
  providers: [SupabaseService],
})
export class AppModule {}
