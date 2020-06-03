import { pool } from './db';
import { sql } from 'slonik';
import { Game } from '../../shared/reducer';

export async function upsertGame(game: Game) {
  console.log('upsert game called');
  console.log(game);
  const { id } = game;
  if (!id || typeof id !== 'string') {
    throw new Error('game state must have an id and it must be a string');
  }

  const serializedGame = JSON.stringify(game);

  await pool.any(sql`
    INSERT INTO games (id, state)
    VALUES (${id}, ${serializedGame})
    ON CONFLICT (id) DO UPDATE
    SET date_updated = (now() at time zone 'utc'),
     state = ${serializedGame};
  `);
}
