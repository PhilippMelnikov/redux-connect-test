import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { todos } from '../src/reducers';

const todoApp = combineReducers({
  todos,
  reduxAsyncConnect,
});

const composeEnhancers = compose;

console.log('create store');

const store = createStore(
  todoApp,
  // window.STATE_FROM_SERVER,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
    )
  )
);

export default store;
