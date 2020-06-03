export type Team = 'red' | 'blue';
export type CardType = Team | 'death' | 'neutral';

export interface Card {
  id: string;
  type: CardType;
  revealed: boolean;
}

export interface State {
  id: string;
  board: Card[];
  turn: Team;
  winner: Team | null;
}
export type Game = State;

export interface NewGameStarted {
  type: 'NewGameStarted';
  payload: {
    board: Card[];
  };
}

export interface CardSelected {
  type: 'CardSelected';
  payload: {
    id: string;
  };
}

export interface SyncedWithServer {
  type: 'SyncedWithServer';
  payload: {
    state: State;
  };
}

export type Event = NewGameStarted | CardSelected | SyncedWithServer;

export function reducer(state: State, event: Event): State {
  switch (event.type) {
    case 'SyncedWithServer':
      return event.payload.state;
    case 'NewGameStarted':
      return newGameStarted(state, event);
    case 'CardSelected':
      return cardSelected(state, event);
    default:
      return state;
  }
}

function newGameStarted(state: State, event: NewGameStarted): State {
  //because the board is randomly generated on the server, so use that as the coin flip for who goes first
  const { board } = event.payload;
  const redCardsCount = board.filter((card) => card.type === 'red').length;
  const blueCardsCount = board.filter((card) => card.type === 'blue').length;
  return {
    ...state,
    id: 'ABCD',
    board: event.payload.board,
    turn: redCardsCount > blueCardsCount ? 'red' : 'blue',
    winner: null,
  };
}

function cardSelected(state: State, event: CardSelected): State {
  //if there is a winner, then this event is a noop
  if (state.winner) {
    return state;
  }

  const { id } = event.payload;
  const { turn: activeTeam, board } = state;
  const passiveTeam = activeTeam === 'red' ? 'blue' : 'red';

  const card = board.find((card) => card.id === id);

  if (!card) {
    console.warn(`card ${id} selected, but it wasnt on the board`);
    return state;
  }

  const nextBoard = board.map((card) =>
    card.id !== id ? card : { ...card, revealed: true }
  );

  if (card.type === 'death') {
    return {
      ...state,
      board: nextBoard,
      winner: passiveTeam,
    };
  }

  if (card.type === 'neutral') {
    return {
      ...state,
      board: nextBoard,
      turn: passiveTeam,
    };
  }

  if (card.type === passiveTeam) {
    return {
      ...state,
      board: nextBoard,
      turn: passiveTeam,
    };
  }

  if (card.type === activeTeam) {
    return {
      ...state,
      board: nextBoard,
      winner: nextBoard.some((card) => !card.revealed && card.type === activeTeam)
        ? null
        : activeTeam,
    };
  }
}
