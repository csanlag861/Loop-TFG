const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const prefix = "/api/";
const prefixPosts = "post/"
const prefixUser = "user/"

export const getAllPosts = () => `${API_BASE_URL}${prefix}${prefixPosts}getAll`;
export const createPost = () => `${API_BASE_URL}${prefix}${prefixPosts}create`;

export const getUserData = () => `${API_BASE_URL}${prefix}${prefixUser}me`;