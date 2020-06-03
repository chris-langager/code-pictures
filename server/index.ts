import http from 'http';
import express, { Request, Response } from 'express';
import next from 'next';
import socketIO, { Socket } from 'socket.io';
import { State, Event, reducer, Game } from '../shared/reducer';
import { getNewGame } from '../shared/game';
import { CONFIG } from './config';
import * as store from './store';

const dev = process.env.NODE_ENV !== 'production';
const port = CONFIG.PORT;

const expressApp = express();
const server = http.createServer(expressApp);
const nextApp = next({ dev });
const io = socketIO(server);

function send(socket: Socket, event: Event) {
  socket.send(event);
}

(async () => {
  await store.migrate();
  await nextApp.prepare();

  // -- Next.js
  const handle = nextApp.getRequestHandler();
  expressApp.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  //web sockets
  io.on('connection', (socket) => {
    const { id } = socket.handshake.query;
    console.log(socket.handshake.query);

    let onDisconnect = () => {};
    const onConnect = async () => {
      let state = await store.getGame(id);

      if (!state) {
        const { board } = getNewGame();
        const newGameStartedEvent: Event = {
          type: 'NewGameStarted',
          payload: {
            board,
          },
        };
        state = reducer(null, newGameStartedEvent);
        await store.upsertGame(state);
        send(socket, newGameStartedEvent);
        return;
      }

      send(socket, {
        type: 'SyncedWithServer',
        payload: { state },
      });

      const onGameUpdate = (state: Game) => {
        if (state.id !== id) {
          return;
        }
        send(socket, {
          type: 'SyncedWithServer',
          payload: { state },
        });
      };
      store.gameEmitter.on('game_updated', onGameUpdate);

      onDisconnect = () => {
        console.log('onDisconnect');
        store.gameEmitter.removeListener('game_updated', onGameUpdate);
      };

      socket.on('message', async (event: Event) => {
        console.log('got event from client', event);

        const state = reducer(await store.getGame(id), event);
        await store.upsertGame(state);
      });
    };

    let timeout: NodeJS.Timer;
    const startTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(onDisconnect, 10 * 1000);
    };

    if (socket.connected) {
      onConnect();
    }
    socket.on('connect', () => {
      onConnect();
    });
    socket.on('disconnect', () => {
      startTimeout();
    });

    //make sure we clean up our event listener when the client disconnects
    socket.on('disconnect', () => {
      startTimeout();
    });
  });

  server.listen({ port }, () => {
    console.log(`env ${process.env.NODE_ENV}: server listening at :${port}...`);
  });
})();
