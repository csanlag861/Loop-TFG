const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const prefix = "/api/";
const prefixPosts = "post/"
const prefixUser = "user/"

type Param = {
    param: string;
}

export const getAllPosts = () => `${API_BASE_URL}${prefix}${prefixPosts}getAll`;
export const createPost = () => `${API_BASE_URL}${prefix}${prefixPosts}create`;
export const updatePost = (param: Param) => `${API_BASE_URL}${prefix}${prefixPosts}update/${param}`;
export const deletePost = ({param}: {param: Param}) => `${API_BASE_URL}${prefix}${prefixPosts}delete/${param}`;
export const getPostsFromUser = ({param}: {param: number}) => `${API_BASE_URL}${prefix}${prefixPosts}${param}/posts`;

export const getUserData = () => `${API_BASE_URL}${prefix}${prefixUser}me`;
export const getProfile = ({param}: {param: number}) => `${API_BASE_URL}${prefix}${prefixUser}profile/${param}`;