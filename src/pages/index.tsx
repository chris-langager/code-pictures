import Head from 'next/head';
import { Board } from '../components/Board';
import { Card } from '../../shared/reducer';
import { url } from 'inspector';
import { Information } from '../components/Information';

const HomePage: React.FC = () => {
  const cards: Card[] = [];
  for (let i = 0; i < 25; i++) {
    cards.push({
      id: `${i}`,
      type: 'neutral',
      revealed: false,
    });
  }

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

export default HomePage;
