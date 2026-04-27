import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  providers: [UserService, SupabaseService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
