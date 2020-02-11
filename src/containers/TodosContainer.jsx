import React from 'react';
import loadable from '@loadable/component'
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { getTodos } from '../actions';
import store from '../store';

const Todos = loadable(() => import(/* webpackChunkName: "HaveALotToDo" */'../components/Todos'));

const TodosContainer = props => (<Todos {...props} />)

const mapStateToProps = ({
  todos: {
    isFetching,
    todos,
  }
}) => ({
  isFetching,
  todos,
});

export default asyncConnect(
  [
    {
      key: 'lunch',
      promise: ({ match: { params }, helpers }) => Promise.resolve({ id: 1, name: 'Borsch' })
    },
    {
      promise: ({ match: { params }, helpers }) => {
        console.log('getTodos');
        return store.dispatch(getTodos());
      }
    }
  ]
)(connect(mapStateToProps, { getTodos })(TodosContainer));
