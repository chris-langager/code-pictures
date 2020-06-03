import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import io from 'socket.io-client';
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
  useEffect,
} from 'react';
import { getNewGame } from '../../shared/game';
import { Controls } from '../components/Controls';
import { Contact } from '../components/Contact';

// const { board, startingTeam } = getNewGame();

// const initialState: State = {
//   board: board,
//   turn: startingTeam,
//   winner: null,
// };

export const GameStateContext: Context<State | null> = createContext(null);

export const DispatchContext: Context<Dispatch<Event>> = createContext(
  (() => null) as React.Dispatch<Event>
);

export const SpymasterContext: Context<boolean> = createContext(false as boolean);

export const SocketContext: Context<SocketIOClient.Socket | null> = createContext(null);

const GamePage: React.FC = () => {
  const { query } = useRouter();
  const [state, dispatch] = useReducer(reducer, null);
  const [spyMaster, setSpymaster] = useState(false);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const socket = io({
      query: {
        id: query.id,
      },
    });

    setSocket(socket);

    const cleanup = () => {
      socket.removeAllListeners();
      socket.disconnect();
    };

    socket.on('connect', () => {
      console.log('client connected');
      socket.on('message', (event: Event) => {
        console.log('got message from server');
        console.log(event);
        dispatch(event);
      });
    });

    return cleanup;
  }, [query]);

  const toggleSpymaster = useCallback(() => {
    setSpymaster(!spyMaster);
  }, [spyMaster]);

  const newGame = useCallback(() => {
    if (!state?.winner) {
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
  }, [state]);

  if (!state) {
    return (
      <div className="container">
        <Head>
          <title>Code Pictures</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div> loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <Head>
        <title>Code Pictures</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GameStateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <SpymasterContext.Provider value={spyMaster}>
            <SocketContext.Provider value={socket}>
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
            </SocketContext.Provider>
          </SpymasterContext.Provider>
        </DispatchContext.Provider>
      </GameStateContext.Provider>
    </div>
  );
};

export default dynamic(() => Promise.resolve(GamePage), {
  ssr: false,
});

// export default GamePage;
