const isServer = typeof window === "undefined";
const API_URL = process.env.API_URL || "http://looptfg-backend-o5hyfi:3000";

const BASE_URL = isServer ? API_URL : "";

const prefix = "/api/";
const prefixPosts = "post/";
const prefixUser = "user/";
const prefixTecnologia = "tecnologia";
const prefixCarpetas = "carpeta";
const prefixGuardados = "guardados";
const prefixAdmin = "admin/";
const prefixTecnologiaAdmin = "tecnologia";
const prefixLike = "like/";
const prefixComentarios = "comentarios/";

export const getAllPosts = () => `${BASE_URL}${prefix}${prefixPosts}getAll`;
export const createPost = () => `${BASE_URL}${prefix}${prefixPosts}create`;
export const updatePost = (param: string) =>
  `${BASE_URL}${prefix}${prefixPosts}update/${param}`;
export const deletePost = ({ param }: { param: number | string }) =>
  `${BASE_URL}${prefix}${prefixPosts}delete/${param}`;
export const getPostsFromUser = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixPosts}${param}/posts`;
export const getPostById = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixPosts}${param}`;

export const getUserData = () => `${BASE_URL}${prefix}${prefixUser}me`;
export const getProfile = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixUser}profile/${param}`;
export const updateProfile = () => `${BASE_URL}${prefix}${prefixUser}profile`;

export const getTecnologias = () => `${BASE_URL}${prefix}${prefixTecnologia}`;
export const getTecnologiasCliente = getTecnologias;

export const createTecnologia = () =>
  `${BASE_URL}${prefix}${prefixTecnologiaAdmin}`;

export const updateTecnologia = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixTecnologiaAdmin}/${param}`;

export const deleteTecnologia = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixTecnologiaAdmin}/${param}`;

export const obtenerCarpetas = () => `${BASE_URL}${prefix}${prefixCarpetas}`;
export const obtenerCarpetasCliente = obtenerCarpetas;

export const guardarPost = () => `${BASE_URL}${prefix}${prefixGuardados}`;
export const obtenerCarpeta = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixCarpetas}/${param}`;
export const crearCarpeta = () => `${BASE_URL}${prefix}${prefixCarpetas}`;
export const eliminarCarpeta = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixCarpetas}/${param}`;

export const getAdminUsuarios = (params?: string) =>
  `${BASE_URL}${prefix}${prefixAdmin}usuarios${params ? `?${params}` : ""}`;
export const getAdminUsuario = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixAdmin}usuarios/${param}`;
export const updateAdminUsuarioRol = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixAdmin}usuarios/${param}/rol`;
export const updateAdminUsuarioEstado = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixAdmin}usuarios/${param}/estado`;
export const deleteAdminUsuario = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixAdmin}usuarios/${param}`;
export const restaurarAdminUsuario = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixAdmin}usuarios/${param}/restaurar`;
export const logInUrl = () => `${BASE_URL}${prefix}auth/login`;
export const registerUrl = () => `${BASE_URL}${prefix}auth/register`;
export const refreshUrl = () => `${BASE_URL}${prefix}auth/refresh`;

export const likePost = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixLike}${param}`;
export const unlikePost = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixLike}${param}`;

export const createComentario = () =>
  `${BASE_URL}${prefix}${prefixComentarios}`;
export const deleteComentario = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixComentarios}${param}`;
export const getCommentsByPost = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixPosts}${param}/comments`;

export const toggleSeguir = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixUser}${param}/seguir`;
export const checkSeguir = ({ param }: { param: number }) =>
  `${BASE_URL}${prefix}${prefixUser}${param}/check`;
