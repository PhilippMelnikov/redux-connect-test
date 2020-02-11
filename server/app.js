import http from 'http';
import cors from'cors';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import cookieSession from 'cookie-session';

import loader from './loader';


const hostname = '127.0.0.1';
const port = 3300;
const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../build'), { index: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', loader);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
