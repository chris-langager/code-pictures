import http from 'http';
import express, { Request, Response } from 'express';
import next from 'next';
import socketIO from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const expressApp = express();
const server = http.createServer(expressApp);
const nextApp = next({ dev });
const io = socketIO(server);

(async () => {
  await nextApp.prepare();

  // -- Next.js
  const handle = nextApp.getRequestHandler();
  expressApp.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  //web sockets
  io.on('connection', (socket) => {
    // const { gameCode } = socket.handshake.query;

    //make sure we clean up our event listener when the client disconnects
    socket.on('disconnect', () => {});
  });
  server.listen({ port }, () => {
    console.log(`env ${process.env.NODE_ENV}: server listening at :${port}...`);
  });
})();
