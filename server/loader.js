import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router-dom';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import fs from 'fs';
import path from 'path';
import { parse as parseUrl } from 'url'

import routes from '../src/routes';

const index = fs.readFileSync(__dirname + '/../build/index.html', 'utf8');
// Our store, entrypoint, and manifest
import App from '../src/App';
import store from '../src/store';
// LOADER
export default (req, res) => {
    console.log('loader');
    // This is the stats file generated by webpack loadable plugin
    const statsFile = path.resolve('./build/asset-manifest.json');
    // We create an extractor from the statsFile
    const extractor = new ChunkExtractor({ statsFile });

    const context = {};
    const url = req.originalUrl || req.url;
    const location = parseUrl(url);

    loadOnServer({ store, location, routes }).then(() => {
      const preloadedState = store.getState();
      // do something w/ the data so the client
      // can access it then render the app
      const html = ReactDOMServer.renderToStaticMarkup(
        <div id="root">
        <ChunkExtractorManager extractor={extractor}>
          <Provider store={store}>
            <StaticRouter
              location={req.url}
              context={context}
            >
              <ReduxAsyncConnect routes={routes} />
            </StaticRouter>
          </Provider>
        </ChunkExtractorManager>
        </div>
      );
      const script = `<script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/recipes/server-rendering/#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
          /</g,
          '\\u003c'
        )}
      </script>`;
      const finalHtml = index.replace('<div id="root"></div>', html + script);
      // handle redirects
      if (context.url) {
        req.header('Location', context.url)
        return res.send(302)
      } else {
        res.send(finalHtml);
      }
    });
};
