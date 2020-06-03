import { pool } from './db';
import { sql } from 'slonik';
import { Game } from '../../shared/reducer';

interface Row {
  id: string;
  state: Game;
}

export async function getGame(id: string): Promise<Game | null> {
  const row = await pool.maybeOne<Row>(sql`select * from games where id = ${id};`);
  return row?.state;
}
