import loadable from '@loadable/component'

import App from '../App';
// import Home from '../components/Home';
import TodosContainer from '../containers/TodosContainer';

import { getTodos } from '../actions';

const Home = loadable(() => import(/* webpackChunkName: "HomeSweetHome" */'../components/Home'));
// const Todos = loadable(() => import(/* webpackChunkName: "HaveALotToDo" */'../components/Todos'));

const routes = [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: "/todos",
        component: TodosContainer,
        exact: true,
        loadData: (match, store) => {
          return store.dispatch(getTodos());
        }
      }
    ]
  }
];

export default routes;
