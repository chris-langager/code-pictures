import { Card as CardData, CardType, Event } from '../../shared/reducer';
import { useState, useContext } from 'react';
import {
  DispatchContext,
  SpymasterContext,
  GameStateContext,
  SocketContext,
} from '../pages/[id]';

interface Props {
  card: CardData;
}
export const Card: React.FC<Props> = ({ card }) => {
  const { winner } = useContext(GameStateContext);
  const dispatch = useContext(DispatchContext);
  const spyMaster = useContext(SpymasterContext);
  const socket = useContext(SocketContext);

  const onClick = () => {
    const event: Event = { type: 'CardSelected', payload: { id } };
    dispatch(event);
    socket.send(event);
  };

  const { id, type, revealed } = card;
  return (
    <div className={`card  ${winner ? 'winner' : ''} `} onClick={onClick}>
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
