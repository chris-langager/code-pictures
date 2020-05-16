import { Card as CardData } from '../../shared/reducer';

interface Props {
  card: CardData;
}
export const Card: React.FC<Props> = ({ card }) => {
  const id = '/whale_draft.png';
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${id})`,
      }}
    ></div>
  );
};
