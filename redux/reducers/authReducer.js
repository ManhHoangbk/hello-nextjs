import { AUTHENTICATE, DEAUTHENTICATE, authenticateAction, AUTHORIZATION } from '../actions/authActions';

const initialState = {
  token: null,
  user : null
};

const authenticateReducer = (state = initialState, action) => {
    // console.log('authenticateReducer action ', action)
  switch(action.type) {
    case AUTHORIZATION:
        return { token: action.user.token, user : action.user };
    case DEAUTHENTICATE:
        return { token: null };
    default:
        return state;
    }
};

export default authenticateReducer
