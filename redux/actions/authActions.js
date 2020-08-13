import { setCookie, removeCookie } from '../../utils/cookie';




export const AUTHENTICATE = 'authenticate';
export const AUTHORIZATION = 'authorization';
export const AUTHORIZATION_FAILURE = 'authorization_falire';
export const DEAUTHENTICATE = 'deauthenticate';
export const LOG_OUT = 'logout';
export const USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED'

 export const authorizationAction = (user) => ({
     type : AUTHORIZATION,
     user : user
 })

 export const authorizationActionFalure = () => ({
    type : AUTHORIZATION_FAILURE,
    user : null
})

export const logoutAction = () => ({
    type : LOG_OUT
})
