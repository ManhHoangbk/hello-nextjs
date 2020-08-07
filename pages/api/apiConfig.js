export const GET_ALL_USERS = "get-all-users";
export const USER_LOGIN = 'login'
export const GET_USER_FROM_TOKEN = 'get-user-from-token'
export const jwtSecret = "koolsoftdev!2020";
export const TOKEN_EXPIRED = 60 * 60; //1h

export const BASE_URL_API = process.env.NODE_ENV == 'development' ? 'http://localhost:3000/' : 'https://hello-nextjs-theta.vercel.app/'