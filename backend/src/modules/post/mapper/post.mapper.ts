import { UserEntity } from '@/modules/user/user.entity';
import { Tecnologia } from '@prisma/client';

type PostWithExtras = {
  id: number;
  contenido: string;
  createdAt: Date;
  usuario_id: number;
  usuario: {
    id?: number;
    username: string;
    avatarURL: string | null;
    nombre: string;
  };
  tecnologias: Tecnologia[];
  postGuardados?: { id: number }[];
  likes?: { id: number }[];
  _count: {
    likes: number;
    comentarios: number;
  };
};

export class PostMapper {
  static toResponse(post: PostWithExtras, currentUser: UserEntity | null) {
    return {
      id: post.id,
      contenido: post.contenido,
      createdAt: post.createdAt,
      usuario: post.usuario,
      tecnologias: post.tecnologias,
      isOwner: currentUser ? currentUser.isOwner(post.usuario_id) : false,
      isGuardado: !!post.postGuardados?.length,
      postGuardado_id: post.postGuardados?.[0]?.id ?? null,
      isLiked: !!post.likes?.length,
      likesCount: post._count.likes,
      comentariosCount: post._count.comentarios,
    };
  }
}
