import { Card as CardData } from '../../shared/reducer';
import { useState } from 'react';

interface Props {
  card: CardData;
}
export const Card: React.FC<Props> = ({ card }) => {
  const [revealed, setRevealed] = useState(false);

  const { id, type } = card;
  return (
    <div className="card" onClick={() => setRevealed(true)}>
      <div
        className="picture"
        style={{
          backgroundImage: `url(${id})`,
        }}
      />
      <div className={`overlay ${type} ${revealed ? 'revealed' : ''}`} />
    </div>
  );
};
