
import type { DocumentContext } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";



const MyDocument = () => (
  <Html lang="en">
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

/**
 * This addition is recommended by AntD for adding styles to the page when using SSR with NextJS
 * Renders the page with CSS-in-JS styles for Ant styles to ensure they get loaded with the page
 * https://ant.design/docs/react/use-with-next#using-pages-router
 */
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
  };
};

export default MyDocument;