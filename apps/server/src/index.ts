import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createServer } from 'http';

import ws from 'ws';
import nodeStatic from 'node-static';

const __dirname = dirname(fileURLToPath(import.meta.url));
const files = new nodeStatic.Server(resolve(__dirname, '../public'));

const server = createServer((req, res) => {
  files.serve(req, res);
});

const wss = new ws.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);
    ws.send(message);
  });
});

server.listen(8080);
