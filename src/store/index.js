import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import { todos } from '../reducers';

const todoApp = combineReducers({
  todos,
  reduxAsyncConnect,
});

let preloadedState = {};

if (typeof window !== 'undefined') {
  // Grab the state from a global variable injected into the server-generated HTML
  preloadedState = window.__PRELOADED_STATE__;
  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__;
}


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  todoApp,
  preloadedState,
  // window.STATE_FROM_SERVER,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
    )
  )
);

export default store;
