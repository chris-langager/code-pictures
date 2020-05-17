import { Card as CardData } from '../../shared/reducer';
import { useState, useContext } from 'react';
import { DispatchContext } from '../pages/[id]';

interface Props {
  card: CardData;
}
export const Card: React.FC<Props> = ({ card }) => {
  const dispatch = useContext(DispatchContext);

  const { id, type, revealed } = card;
  return (
    <div
      className="card"
      onClick={() => dispatch({ type: 'CardSelected', payload: { id } })}
    >
      <div
        className="picture"
        style={{
          backgroundImage: `url(${id.split('-')[1]})`,
        }}
      />
      <div className={`overlay ${type} ${revealed ? 'revealed' : ''}`} />
    </div>
  );
};
