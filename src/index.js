import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { loadableReady } from '@loadable/component'
import store from './store';
import routes from './routes';
import './index.css';
import * as serviceWorker from './serviceWorker';

loadableReady(() => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <ReduxAsyncConnect
          routes={routes}
        />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
