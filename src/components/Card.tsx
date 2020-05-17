import { Card as CardData, CardType } from '../../shared/reducer';
import { useState, useContext } from 'react';
import { DispatchContext, SpymasterContext, GameStateContext } from '../pages/[id]';

interface Props {
  card: CardData;
}
export const Card: React.FC<Props> = ({ card }) => {
  const { winner } = useContext(GameStateContext);
  const dispatch = useContext(DispatchContext);
  const spyMaster = useContext(SpymasterContext);

  const { id, type, revealed } = card;
  return (
    <div
      className={`card  ${winner ? 'winner' : ''} `}
      onClick={() => dispatch({ type: 'CardSelected', payload: { id } })}
    >
      <div
        className="picture"
        style={{
          backgroundImage: `url(${id.split('-')[1]})`,
        }}
      />
      <div
        className={`
        overlay 
        ${type} 
        ${revealed ? 'revealed' : ''} 
        ${spyMaster || winner ? 'spymaster' : ''}
        `}
      />
    </div>
  );
};

// const red = (opacity: number) => `hsla(0, 79%, 72%, ${opacity})`;
// const blue = (opacity: number) => `hsla(201, 54%, 69%, ${opacity})`;
// const neutral = (opacity: number) => `hsla(24, 69%, 85%, ${opacity})`;
// const death = (opacity: number) => `hsla(0, 0%, 20%,  ${opacity})`;
