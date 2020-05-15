import Head from 'next/head';

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <Head>
        <title>Code Pictures</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>This sure is a page and should update on merge with master.</main>

      <style jsx>{``}</style>

      <style jsx global>{`
        html,
        body {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
