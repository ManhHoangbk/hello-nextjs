// import {createStore} from 'redux';
// import rootReducer from './reducers/rootReducer';

// const store = createStore(rootReducer);

// export default store;

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import counterReducer from '../redux/reducers/counterReducer';
import authenticateReducer from '../redux/reducers/authReducer'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
    counterReducer,
    authenticateReducer
    
});

const reducer = (state, action) => {
  // console.log('state ', state)
  // console.log('action ', action)
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)
