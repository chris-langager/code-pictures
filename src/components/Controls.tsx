import { useContext } from 'react';
import { GameStateContext, SpymasterContext } from '../pages/[id]';

interface Props {
  setSpymaster: () => void;
  newGame: () => void;
}
export const Controls: React.FC<Props> = ({ setSpymaster, newGame }) => {
  const { winner } = useContext(GameStateContext);
  const isSpymaster = useContext(SpymasterContext);

  return (
    <div className="controls">
      {!winner && (
        <button disabled={isSpymaster} onClick={setSpymaster}>
          {isSpymaster ? `You're the clue giver` : `I'm the clue giver!`}
        </button>
      )}
      <button onClick={newGame}>Start new game</button>
    </div>
  );
};
