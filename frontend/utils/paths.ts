export const landingPath = () => "/";
export const homePath = () => "/posts";

export const bookmarkPath = () => "/guardados";

export const profilePath = ({ param }: { param: number }) => `/perfil/${param}`;

export const dashboardPath = () => "/dashboard/usuarios";

export const postPath = ({ id }: { id: number }) => `/posts/${id}`;

export const basePath = () => "https://loop-tfg.vercel.app/";
