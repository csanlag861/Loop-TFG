export class ResponsePostDto {
  id: number;
  contenido: string;
  createdAt: Date;
  isOwner?: boolean;
  usuario: {
    avatarURL: string | null;
    nombre: string;
    username: string;
  };
  tecnologias: {
    id: number;
    nombre: string;
  }[];
  isGuardado?: boolean;
  postGuardado_id?: number | null;
  isLiked?: boolean;
  likesCount?: number;
}
