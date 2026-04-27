/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }

  async uploadAvatar(file: Express.Multer.File, user_id: number) {
    const fileExt = file.mimetype.split('/')[1];

    const fileName = `${user_id}-${Date.now()}.${fileExt}`;

    const { error } = await this.supabase.storage
      .from('avatars')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
        cacheControl: '3600',
      });

    if (error) {
      console.error('[Supabase Service] Error uploading to Supabase:', error);
      throw new BadRequestException('Error subiendo la imagen a Supabase');
    }
    console.log('[Supabase Service] Upload to bucket successful');

    const { data } = this.supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return { fileName, publicURL: data.publicUrl };
  }

  async deleteAvatar(fileName: string) {
    const { error } = await this.supabase.storage
      .from('avatars')
      .remove([fileName]);

    if (error) {
      throw new BadRequestException('Error eliminando la imagen de Supabase');
    }

    return { success: true };
  }
}
