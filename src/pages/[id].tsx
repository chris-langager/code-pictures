import Head from 'next/head';
import { Board } from '../components/Board';
import { reducer, State, Event } from '../../shared/reducer';
import { Information } from '../components/Information';
import {
  useState,
  useReducer,
  Context,
  Dispatch,
  createContext,
  useCallback,
} from 'react';
import { getNewGame } from '../../shared/game';
import { Controls } from '../components/Controls';
import { Contact } from '../components/Contact';

const { board, startingTeam } = getNewGame();

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

  const toggleSpymaster = useCallback(() => {
    setSpymaster(!spyMaster);
  }, [spyMaster]);

  const newGame = useCallback(() => {
    if (!state.winner) {
      const yes = confirm(
        `You're in the middle of a game!  Do you want to end this game and start a new one?`
      );
      if (!yes) {
        return;
      }
    }

    setSpymaster(false);
    const { board } = getNewGame();
    dispatch({
      type: 'NewGameStarted',
      payload: {
        board,
      },
    });
  }, [state.winner]);

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

            <div className="controls-area">
              <Controls setSpymaster={toggleSpymaster} newGame={newGame} />
            </div>

            <div className="contact-area">
              <Contact />
            </div>

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
