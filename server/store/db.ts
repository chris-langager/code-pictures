import { CONFIG } from '../config';
import {
  createPool,
  TaggedTemplateLiteralInvocationType,
  QueryResultRowType,
} from 'slonik';

export const pool = createPool(CONFIG.DATABASE_URL);

//not sure about this, but I'm using this type in a lot of places and it sure is long
export type Sql = TaggedTemplateLiteralInvocationType<QueryResultRowType<string>>;
