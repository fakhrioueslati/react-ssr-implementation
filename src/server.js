import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from "react-router-dom/server";
import App from './App';

const server = express();

const assets = require('../dist/assets.json');

server.use(express.static(path.join(__dirname, '../dist')));

server.get('/*', (req, res) => {
  const context = {};

  const markup = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const html = `
    <!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Your App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.main?.css
            ? `<link rel="stylesheet" href="${assets.main.css}">`
            : ''
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        ${assets.main?.js ? `<script src="${assets.main.js}" defer crossorigin></script>` : ''}
    </body>
    </html>
  `;

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    res.send(html);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
