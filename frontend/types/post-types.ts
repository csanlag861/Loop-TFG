export interface TecnologiaPost {
  id: number;
  nombre: string;
  background?: string;
  border?: string;
  text?: string;
}

export interface PostEditable {
  id: number;
  contenido: string;
  createdAt: string;
  tecnologias: TecnologiaPost[];
  usuario: {
    id: number;
    nombre: string;
    username: string;
    avatarURL: string;
  };
}