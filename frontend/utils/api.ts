const prefix = "/api/";
const prefixPosts = "post/"
const prefixUser = "user/"

export const getAllPosts = () => `${prefix}${prefixPosts}getAll`;
export const getUserData = () => `${prefix}${prefixUser}me`;