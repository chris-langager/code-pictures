import Head from 'next/head';
import { Board } from '../components/Board';
import { Card, Team, reducer, State, Event } from '../../shared/reducer';
import { Information } from '../components/Information';
import { useState, useReducer, Context, Dispatch, createContext } from 'react';

const initialState: State = {
  id: 'ABCD',
  board: newBoard(),
  turn: 'red',
  score: {
    red: 0,
    blue: 0,
  },
  deathCardPicked: null,
};

// export const TodosContext: Context<[State, Dispatch<Event>]> = React.createContext([
//   initialState,
//   (() => initialState) as React.Dispatch<Event>,
// ]);

// export const TodosReducerProvider: React.FC = (props) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <TodosContext.Provider value={[state, dispatch]}>
//       {props.children}
//     </TodosContext.Provider>
//   );
// };

export const DispatchContext: Context<Dispatch<Event>> = createContext(
  (() => initialState) as React.Dispatch<Event>
);

export const SpymasterContext: Context<boolean> = createContext(false as boolean);

const GamePage: React.FC = () => {
  // const [cards] = useState(newBoard());
  const [state, dispatch] = useReducer(reducer, initialState);
  const [spyMaster, setSpymaster] = useState(false);

  return (
    <div className="container">
      <Head>
        <title>Code Pictures</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DispatchContext.Provider value={dispatch}>
        <SpymasterContext.Provider value={spyMaster}>
          <div className="information-area">
            <Information />
            <button onClick={() => setSpymaster(!spyMaster)}> toggle spymaster</button>
          </div>

          <div className="board-area">
            <Board cards={state.board} />
          </div>
        </SpymasterContext.Provider>
      </DispatchContext.Provider>
    </div>
  );
};

export default GamePage;

function newBoard() {
  //all the cards
  const cardIds = Array(50).fill('whale_draft.png', 0, 50);

  //pick who goes first
  const startingTeam: Team = Math.random() > 0.5 ? 'red' : 'blue';
  const secondTeam: Team = startingTeam === 'red' ? 'blue' : 'red';

  //get some random unique numbers for laying out the board
  const randomUniqueNumbers = shuffle([...Object.keys(cardIds)]);

  const startingTeamsCards = randomUniqueNumbers.splice(0, 9).map<Card>((i) => ({
    id: i + '-' + cardIds[i],
    type: startingTeam,
    revealed: false,
  }));

  const secondTeamsCards = randomUniqueNumbers
    .splice(0, 8)
    .map<Card>((i) => ({ id: i + '-' + cardIds[i], type: secondTeam, revealed: false }));

  const neutralCards = randomUniqueNumbers
    .splice(0, 7)
    .map<Card>((i) => ({ id: i + '-' + cardIds[i], type: 'neutral', revealed: false }));

  const deathCard = randomUniqueNumbers
    .splice(0, 1)
    .map<Card>((i) => ({ id: i + '-' + cardIds[i], type: 'death', revealed: false }))[0];

  const board: Card[] = shuffle([
    ...startingTeamsCards,
    ...secondTeamsCards,
    ...neutralCards,
    deathCard,
  ]);

  return board;
}

function shuffle<T>(input: T[]): T[] {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
