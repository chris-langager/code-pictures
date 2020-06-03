CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  date_created TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  date_updated TIMESTAMP WITH TIME ZONE DEFAULT (now() at time zone 'utc'),
  state JSON NOT NULL
);

CREATE OR REPLACE FUNCTION game_updated()
  RETURNS trigger AS
$BODY$
    BEGIN
        PERFORM pg_notify('game_updated', row_to_json(NEW)::text);
        RETURN NULL;
    END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;


CREATE  TRIGGER notify_game_updated
  AFTER INSERT OR UPDATE
  ON "games"
  FOR EACH ROW
  EXECUTE PROCEDURE game_updated();