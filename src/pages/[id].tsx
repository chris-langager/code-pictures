import Head from 'next/head';
import { Board } from '../components/Board';
import { reducer, State, Event } from '../../shared/reducer';
import { Information } from '../components/Information';
import { useState, useReducer, Context, Dispatch, createContext } from 'react';
import { newBoard } from '../../shared/game';

const { board, startingTeam } = newBoard();

const initialState: State = {
  id: 'ABCD',
  board: board,
  turn: startingTeam,
  winner: null,
};

export const GameStateContext: Context<State> = createContext(initialState);

export const DispatchContext: Context<Dispatch<Event>> = createContext(
  (() => initialState) as React.Dispatch<Event>
);

export const SpymasterContext: Context<boolean> = createContext(false as boolean);

const GamePage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [spyMaster, setSpymaster] = useState(false);

  return (
    <div className="container">
      <Head>
        <title>Code Pictures</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GameStateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <SpymasterContext.Provider value={spyMaster}>
            <div className="information-area">
              <Information />
            </div>

            <button onClick={() => setSpymaster(!spyMaster)}> toggle spymaster</button>
            <div className="board-area">
              <Board cards={state.board} />
            </div>
          </SpymasterContext.Provider>
        </DispatchContext.Provider>
      </GameStateContext.Provider>
    </div>
  );
};

export default GamePage;
