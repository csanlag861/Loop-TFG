const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = process.env.API_URL;
console.log("API:", process.env.NEXT_PUBLIC_API_URL);

const prefix = "/api/";
const prefixPosts = "post/";
const prefixUser = "user/";
const prefixTecnologia = "tecnologia";
const prefixCarpetas = "carpeta";
const prefixGuardados = "guardados";
const prefixAdmin = "admin/";
const prefixTecnologiaAdmin = "tecnologia";
const prefixLike = "like/";

type Param = {
  param: string;
};

export const getAllPosts = () => `${API_URL}${prefix}${prefixPosts}getAll`;
export const createPost = () => `${API_URL}${prefix}${prefixPosts}create`;
export const updatePost = (param: string) =>
  `${API_URL}${prefix}${prefixPosts}update/${param}`;
export const deletePost = ({ param }: { param: Param }) =>
  `${API_URL}${prefix}${prefixPosts}delete/${param}`;
export const getPostsFromUser = ({ param }: { param: number }) =>
  `${API_URL}${prefix}${prefixPosts}${param}/posts`;

export const getUserData = () => `${API_URL}${prefix}${prefixUser}me`;
export const getProfile = ({ param }: { param: number }) =>
  `${API_URL}${prefix}${prefixUser}profile/${param}`;
export const updateProfile = () => `${API_URL}${prefix}${prefixUser}profile`;

export const getTecnologias = () => `${API_URL}${prefix}${prefixTecnologia}`;
export const getTecnologiasCliente = () =>
  `${API_BASE_URL}${prefix}${prefixTecnologia}`;
export const createTecnologia = () =>
  `${API_URL}${prefix}${prefixTecnologiaAdmin}`;

export const updateTecnologia = ({ param }: { param: number }) =>
  `${API_URL}${prefix}${prefixTecnologiaAdmin}/${param}`;

export const deleteTecnologia = ({ param }: { param: number }) =>
  `${API_URL}${prefix}${prefixTecnologiaAdmin}/${param}`;

export const obtenerCarpetas = () => `${API_URL}${prefix}${prefixCarpetas}`;
export const obtenerCarpetasCliente = () =>
  `${API_BASE_URL}${prefix}${prefixCarpetas}`;
export const guardarPost = () => `${API_BASE_URL}${prefix}${prefixGuardados}`;
export const obtenerCarpeta = ({ param }: { param: number }) =>
  `${API_BASE_URL}${prefix}${prefixCarpetas}/${param}`;
export const crearCarpeta = () => `${API_BASE_URL}${prefix}${prefixCarpetas}`;
export const eliminarCarpeta = ({ param }: { param: number }) =>
  `${API_BASE_URL}${prefix}${prefixCarpetas}/${param}`;

export const getAdminUsuarios = (params?: string) =>
  `${API_URL}${prefix}${prefixAdmin}usuarios${params ? `?${params}` : ""}`;
export const getAdminUsuario = ({ param }: { param: number }) =>
  `${API_URL}${prefix}${prefixAdmin}usuarios/${param}`;
export const updateAdminUsuarioRol = ({ param }: { param: number }) =>
  `${API_URL}${prefix}${prefixAdmin}usuarios/${param}/rol`;
export const updateAdminUsuarioEstado = ({ param }: { param: number }) =>
  `${API_URL}${prefix}${prefixAdmin}usuarios/${param}/estado`;
export const deleteAdminUsuario = ({ param }: { param: number }) =>
  `${API_URL}${prefix}${prefixAdmin}usuarios/${param}`;
export const restaurarAdminUsuario = ({ param }: { param: number }) =>
  `${API_URL}${prefix}${prefixAdmin}usuarios/${param}/restaurar`;
export const logInUrl = () => `${API_URL}${prefix}auth/login`;
export const registerUrl = () => `${API_URL}${prefix}auth/register`;
export const refreshUrl = () => `${API_URL}${prefix}auth/refresh`;

export const likePost = ({ param }: { param: number }) =>
  `${API_URL}${prefix}${prefixLike}${param}`;
export const unlikePost = ({ param }: { param: number }) =>
  `${API_URL}${prefix}${prefixLike}${param}`;
