// import {createStore} from 'redux';
// import rootReducer from './reducers/rootReducer';

// const store = createStore(rootReducer);

// export default store;

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'


import thunkMiddleware from 'redux-thunk'
import counterReducer from '../redux/reducers/counterReducer';
import authenticateReducer from '../redux/reducers/authReducer'
import appInfoReducer from '../redux/reducers/topicReducer'
import userRateReducer from '../redux/reducers/UserRateReducer'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
    counterReducer,
    authenticateReducer,
    appInfoReducer,
    userRateReducer
    
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


export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, bindMiddleware([sagaMiddleware]))

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(makeStore, { debug: true })



// const initStore = () => {
//   return createStore(reducer, bindMiddleware([thunkMiddleware]))
// }

// export const wrapper = createWrapper(initStore)
