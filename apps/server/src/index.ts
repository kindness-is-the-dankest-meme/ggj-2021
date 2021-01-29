import { createServer } from 'http';
import { dirname, extname, resolve } from 'path';
import { fileURLToPath } from 'url';

import httpProxy from 'http-proxy';
import nodeStatic from 'node-static';
import ws from 'ws';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assets = new nodeStatic.Server(resolve(__dirname, '../public'));

const client = httpProxy.createProxyServer({ target: 'http://localhost:8000' });

const server = createServer((req, res) => {
  assets.serve(req, res, (err) => {
    if (!(err && req.url)) {
      return;
    }

    if (['.js', '.json'].includes(extname(req.url))) {
      client.web(req, res);
      return;
    }

    /**
     * n.b. the `Callback` is mis-typed in `@types/node-static`
     * @see https://github.com/cloudhead/node-static#intercepting-errors--listening
     */
    // @ts-expect-error
    res.writeHead(err.status, err.headers);
    res.end();
  });
});

const wss = new ws.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);
    ws.send(message);
  });
});

server.listen(8080);
