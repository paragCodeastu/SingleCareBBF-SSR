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
import axios from 'axios';

const PORT = process.env.PORT || 3005;
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/drugdetailsapi', drugdetailsapiRouter);
app.use('/searchapi', searchapiRouter);
app.use(express.static(path.resolve(__dirname, 'build')));
app.get('/', async (req, res) => {
  const selectedDrug = 'neuraptine';
  const selectedDrugDisplayName = 'Neuraptine';

  const drugDetailsApiResponse = await axios.post('http://localhost:3005/drugdetailsapi', {
    selectedDrug,
    selectedDrugDisplayName
  });
  const drugDetailsApiData = drugDetailsApiResponse.data;

  const query='ac';
  const maxResults=6;

  const searchApiResponse = await axios.post('http://localhost:3005/searchapi', {
    query,
    maxResults
  });
  const searchApiData = searchApiResponse.data;

  const appHtml = ReactDOMServer.renderToString(
    <App drugDetailsApiData={drugDetailsApiData} searchApiData={searchApiData} />
  );

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong');
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      `<html>
      <head>
      <title>React SSR</title>
      </head>
        <body>
          <div id="root">${appHtml}</div>
          <script src="/bundle.js"></script>
          </body>
      </html>`
    );
  });
});

// app.use(express.static('./build'));
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
export default app;
