import es6Promise from 'es6-promise';
import * as isomorphicFetch from 'isomorphic-fetch';
import { GET_TODOS_SEND, GET_TODOS_SUCCESS, GET_TODOS_FAIL } from '../constants';

es6Promise.polyfill();

export const getTodos = () => dispatch => new Promise(async (resolve, reject) => {
  dispatch({
    type: GET_TODOS_SEND,
  });
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
  if (response.ok) {
    const res = await response.json();
    dispatch({
      type: GET_TODOS_SUCCESS,
      payload: res
    });
    resolve(res);
  } else {
    dispatch({
      type: GET_TODOS_FAIL,
    });
    reject('fail');
  }
})
