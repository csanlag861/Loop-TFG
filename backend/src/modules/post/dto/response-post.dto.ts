export class ResponsePostDto {
  contenido: string;
  createdAt: Date;
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
