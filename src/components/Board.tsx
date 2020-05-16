import { Card as CardData } from '../../shared/reducer';
import { Card } from './Card';

interface Props {
  cards: CardData[];
}
export const Board: React.FC<Props> = ({ cards }) => {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card key={card.id} card={card}></Card>
      ))}
    </div>
  );
};
