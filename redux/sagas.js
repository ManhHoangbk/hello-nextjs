import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { AUTHORIZATION } from './actions/authActions';
import { USER_LOGIN } from '../pages/api/apiConfig';
import { setCookie, TOKEN } from '../utils/cookie';

async function callUserApi(userObj){
    
    const rawResponse = await fetch(process.env.BASE_URL_API +'api/user/authention/' + USER_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userObj)
    });
    const user = await rawResponse.json();
    console.log('obj json ', user)
    return user
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
    try {
       const user = yield call(callUserApi, action.user);
       setCookie(TOKEN, user.token)
       yield put({type: AUTHORIZATION, user: user});
    } catch (e) {
       yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
 }
 
 /*
   Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
   Allows concurrent fetches of user.
 */
 function* mySaga() {
   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
 }

//  function* mySaga() {
//     yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
//   }
  
  export default mySaga;