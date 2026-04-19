// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%231D9E75'/><text x='50%25' y='50%25' font-size='20' font-weight='700' fill='white' text-anchor='middle' dominant-baseline='central' font-family='Arial'>T</text></svg>" />
        <meta name="theme-color" content="#1D9E75" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
