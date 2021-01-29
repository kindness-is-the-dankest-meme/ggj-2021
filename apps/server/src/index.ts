import { createServer } from 'http';
import Ws from 'ws';

const server = createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200);
  res.end('<p>hi, hello</p>', 'utf-8');
});
const wss = new Ws.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);
    ws.send(message);
  });
});

server.listen(8080);
