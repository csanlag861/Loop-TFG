import { UserEntity } from '@/modules/user/user.entity';
import { Tecnologia, Usuario } from '@prisma/client';

export class PostMapper {
    static toResponse(
        post: {
            id: number;
            contenido: string;
            createdAt: Date;
            usuario_id: number;
            usuario: Usuario;
            tecnologias: Tecnologia[];
        },
        currentUser: UserEntity | null,
    ) {
        return {
            id: post.id,
            contenido: post.contenido,
            createdAt: post.createdAt,
            usuario: post.usuario,
            tecnologias: post.tecnologias,
            isOwner: currentUser ? currentUser.isOwner(post.usuario_id) : false,
        };
    }
}
