import '../styles/layout.css';
import '../styles/information.css';
import '../styles/controls.css';
import '../styles/contact.css';
import '../styles/board.css';
import '../styles/card.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat"
        rel="stylesheet"
      ></link>
    </>
  );
}
