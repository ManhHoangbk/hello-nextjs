import { AUTHENTICATE, DEAUTHENTICATE, authenticateAction, AUTHORIZATION, LOG_OUT } from '../actions/authActions';

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
    case LOG_OUT:
      return initialState
    default:
      return state;
  }
};

export default authenticateReducer
