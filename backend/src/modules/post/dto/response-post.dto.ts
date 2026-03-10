export class ResponsePostDto {
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
}
