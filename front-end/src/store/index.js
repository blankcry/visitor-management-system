import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const jwtToken = localStorage.getItem('Login Token');

const DEFAULT_STATE = {}
const STATE = {
  auth: {
    isAuthenticated: jwtToken ? true : false,
    user: localStorage.getItem('user')
  }
}

export const store = jwtToken ? createStore(
  reducers,
  STATE,
  compose(
    applyMiddleware(thunk)
  )
)
  :
  createStore(
    reducers,
    DEFAULT_STATE,
    compose(
      applyMiddleware(thunk)
    )
  )
//Applyh support for redux cextension to view states