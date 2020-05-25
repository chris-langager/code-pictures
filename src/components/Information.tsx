import { useContext } from 'react';
import { GameStateContext } from '../pages/[id]';

interface Props {}
export const Information: React.FC<Props> = ({}) => {
  const { turn, board, winner } = useContext(GameStateContext);

  const activeTeam = turn;
  const redCardsRemaining = board.reduce(
    (total, card) => (!card.revealed && card.type === 'red' ? total + 1 : total),
    0
  );
  const blueCardsRemaining = board.reduce(
    (total, card) => (!card.revealed && card.type === 'blue' ? total + 1 : total),
    0
  );

  return (
    <div className="information">
      <h1>Code Pictures</h1>

      <p>Link to this game. (click to copy)</p>

      <p>Cards remaining:</p>
      <ul>
        <li>Red - {redCardsRemaining}</li>
        <li>Blue - {blueCardsRemaining}</li>
      </ul>

      {winner && (
        <p>
          <strong>The {winner} team won!</strong>
        </p>
      )}

      {!winner && <p>It's the {activeTeam} teams turn!</p>}
    </div>
  );
};
