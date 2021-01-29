import { createServer } from 'http';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import nodeStatic from 'node-static';
import ws from 'ws';

const __dirname = dirname(fileURLToPath(import.meta.url));
const files = new nodeStatic.Server(resolve(__dirname, '../public'));

const server = createServer((req, res) => {
  files.serve(req, res, (err) => {
    if (!err) {
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
