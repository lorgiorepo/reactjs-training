import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';

import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';

function requestHandler(request, response) {
  const context = createServerRenderContext();
  let html = renderToString(
    <ServerRouter location={request.url} context={context}>
      <Pages />
    </ServerRouter>,
  );

  const result = context.getResult();

  response.setHeader('Content-Type', 'text/html');

  if (result.redirect) {
    response.writeHead(301, {
      Location: result.redirect.pathname,
    });
  }

  if (result.missed) {
    response.writeHead(404);

    html = renderToString(
      <ServerRouter location={request.url} context={context}>
        <Pages />
      </ServerRouter>,
    );
  }

  response.write(
    renderToStaticMarkup(
      <Layout
        title="Aplicación"
        content={html}
      />,
    ),
  );
  response.end();
}

const server = http.createServer(requestHandler);

server.listen(3000);
