import {
  GET_TODOS_SEND,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAIL
} from '../constants';

const initState = {
  todos: false,
  isFetching: false,
  error: null,
};

export const todos = (state = initState, action) => {
  switch (action.type) {
    case GET_TODOS_SEND:
      return {
        ...state,
        isFetching: true
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        isFetching: false
      };
    case GET_TODOS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state
  }
}
