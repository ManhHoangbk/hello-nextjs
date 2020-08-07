import { setCookie, removeCookie } from '../../utils/cookie';




export const AUTHENTICATE = 'authenticate';
export const AUTHORIZATION = 'authorization';
export const AUTHORIZATION_FAILURE = 'authorization_falire';
export const DEAUTHENTICATE = 'deauthenticate';

 export const authorizationAction = (user) => ({
     type : AUTHORIZATION,
     user : user
 })

 export const authorizationActionFalure = () => ({
    type : AUTHORIZATION_FAILURE,
    user : null
})

//  export const authenticate = (user, dispatch) =>{
//    if(!user){
//        console.log('user not valid')
//        return
//    }
//      const rawResponse = await fetch('/api/user/authention/login', {
//        method: 'POST',
//        headers: {
//          'Accept': 'application/json',
//          'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(user)
//      });
//      console.log('response token ', response.headers)
//      // setCookie('token', response.data.token);
//      const user = await rawResponse.json();
//      console.log(user);
//      Router.push('/');
//      dispatch(authenticateAction(user))
// }