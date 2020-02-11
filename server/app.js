import http from 'http';
import cors from'cors';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import cookieSession from 'cookie-session';

import loader from './loader';

// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom';
//
// import App from '../src/App';

const hostname = '127.0.0.1';
const port = 3300;
const app = express() // setup express application
const server = http.createServer(app);

// app.use(cookieSession({
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     keys: ['superDuperInsanelySecretKey']
// }));

app.use(cors());
app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(express.static(path.join(__dirname, '../build'), { index: false }));
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', loader);
// loader();

// app.use(express.Router().get('/', loader));
// app.use(loader);

// app.get('/', (req, res) => {
//   console.log('LALALA: ');
//   res.send();
// });
//
// app.get('*', (req, res) => {
//     console.log('-----------------------------HEJ!-----------------------------');
//     // res.sendFile(path.join(__dirname, '../build/index.html'), (err) => {
//     //     if (err) {
//     //         res.status(err.status).end();
//     //     }
//     // });
//     const context = {};
//
//     const newHtml = ReactDOMServer.renderToStaticMarkup(
//       <StaticRouter location={req.url} context={context}>
//         <App />
//       </StaticRouter>
//     );
//
//     console.log('newHtml: ', newHtml);
//
//     if (context.url) {
//       res.writeHead(301, {
//         Location: context.url
//       });
//       res.end();
//     } else {
//     //   res.write(`
//     //   <!doctype html>
//     //   <div id="app">${html}</div>
//     // `);
//     //   res.end();
//     res.send(newHtml);
//     }
// });


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
