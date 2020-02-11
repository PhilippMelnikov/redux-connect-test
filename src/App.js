import React from 'react';
import renderRoutes from 'react-router-config/renderRoutes'
import { Switch, Link } from 'react-router-dom';

import RouteWithSubRoutes from './components/RouteWithSubRoutes';
import routes from './routes';
import './main.less';

function App(props) {
  return (
    <div className="App">
      <div className="App-header">
        <Link className="App-link" to="/" >
          Take Me Home
        </Link>
        <Link className="App-link" to="/todos" >
          Todos List
        </Link>
        {renderRoutes(props.route.routes)}
      </div>
    </div>
  );
}

export default App;
