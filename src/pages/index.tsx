import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';

const HomePage: React.FC = () => {
  useEffect(() => {
    Router.push('/ABCD');
  });

  return (
    <div className="container">
      <Head>
        <title>Code Pictures</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default HomePage;
