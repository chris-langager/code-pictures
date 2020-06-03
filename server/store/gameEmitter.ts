import * as pg from 'pg';
import { EventEmitter } from 'events';
import { CONFIG } from '../config';

export const gameEmitter = new EventEmitter();
const client = new pg.Client(CONFIG.DATABASE_URL);

(async () => {
  await client.connect();
  client.on('notification', (notification) => {
    const data = JSON.parse(notification.payload);
    gameEmitter.emit('game_updated', data.state);
  });

  console.log('making listen query...');
  await client.query('LISTEN game_updated');
  console.log('listen query complete');
})();
