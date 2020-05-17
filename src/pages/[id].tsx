import Head from 'next/head';
import { Board } from '../components/Board';
import { Card, Team } from '../../shared/reducer';
import { Information } from '../components/Information';
import { useState } from 'react';

const GamePage: React.FC = () => {
  const [cards] = useState(newBoard());

  return (
    <div className="container">
      <Head>
        <title>Code Pictures</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="information-area">
        <Information />
      </div>

      <div className="board-area">
        <Board cards={cards} />
      </div>
    </div>
  );
};

export default GamePage;

function newBoard() {
  //all the cards
  const cardIds = Array(50).fill('whale_draft.png', 0, 50);

  //pick who goes first
  const startingTeam: Team = Math.random() > 0.5 ? 'red' : 'blue';
  const secondTeam: Team = startingTeam === 'red' ? 'blue' : 'red';

  //get some random unique numbers for laying out the board
  const randomUniqueNumbers = shuffle([...Object.keys(cardIds)]);

  const startingTeamsCards = randomUniqueNumbers
    .splice(0, 9)
    .map<Card>((i) => ({ id: cardIds[i], type: startingTeam, revealed: false }));

  const secondTeamsCards = randomUniqueNumbers
    .splice(0, 8)
    .map<Card>((i) => ({ id: cardIds[i], type: secondTeam, revealed: false }));

  const neutralCards = randomUniqueNumbers
    .splice(0, 7)
    .map<Card>((i) => ({ id: cardIds[i], type: 'neutral', revealed: false }));

  const deathCard = randomUniqueNumbers
    .splice(0, 1)
    .map<Card>((i) => ({ id: cardIds[i], type: 'death', revealed: false }))[0];

  const board: Card[] = shuffle([
    ...startingTeamsCards,
    ...secondTeamsCards,
    ...neutralCards,
    deathCard,
  ]);

  return board;
}

function shuffle<T>(input: T[]): T[] {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
