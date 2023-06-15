import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import App from '../src/App';
import logger from 'morgan';
import cors from 'cors';
import searchapiRouter from './routes/searchapi';
import drugdetailsapiRouter from './routes/drugdetailsapi';
import userapiRouter from './routes/users'
const PORT = process.env.PORT || 3005;
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/drugdetailsapi', drugdetailsapiRouter);

app.use('/searchapi', searchapiRouter);
app.use('/users',userapiRouter)
app.get('/', (req, res) => {
  console.log('Server Execution Start');
  const apphtml = ReactDOMServer.renderToString(<App />);
  const indexFile = path.resolve('./build/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong');
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${apphtml}</div>`)
    );
  });
});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
