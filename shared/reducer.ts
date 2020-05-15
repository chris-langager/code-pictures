export type Team = 'Red' | 'Blue';
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
  score: Record<Team, number>;
  deathCardPicked: Team | null;
}

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

export type Event = NewGameStarted | CardSelected;

export function reduce(state: State, event: Event): State {
  switch (event.type) {
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
  const redCardsCount = board.filter((card) => card.type === 'Red').length;
  const blueCardsCount = board.filter((card) => card.type === 'Blue').length;
  return {
    ...state,
    score: {
      Red: 0,
      Blue: 0,
    },
    board: event.payload.board,
    turn: redCardsCount > blueCardsCount ? 'Red' : 'Blue',
  };
}

function cardSelected(state: State, event: CardSelected): State {
  const { id } = event.payload;
  const { turn: activeTeam, board, score } = state;
  const passiveTeam = activeTeam === 'Red' ? 'Blue' : 'Red';

  const card = board.find((card) => card.id === id);
  const otherCards = board.filter((card) => card.id !== id);
  if (!card) {
    console.warn(`card ${id} selected, but it wasnt on the board`);
    return state;
  }

  if (card.type === 'death') {
    return {
      ...state,
      deathCardPicked: activeTeam,
    };
  }

  if (card.type === 'neutral') {
    return {
      ...state,
      board: [...otherCards, { ...card, revealed: true }],
      turn: passiveTeam,
    };
  }

  if (card.type === passiveTeam) {
    return {
      ...state,
      board: [...otherCards, { ...card, revealed: true }],
      turn: passiveTeam,
    };
  }

  if (card.type === passiveTeam) {
    return {
      ...state,
      board: [...otherCards, { ...card, revealed: true }],
      score: {
        ...score,
        [activeTeam]: score[activeTeam] + 1,
      },
    };
  }
}
