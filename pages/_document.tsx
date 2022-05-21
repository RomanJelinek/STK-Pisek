import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.jpeg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="V JIKONA STK Písek provádíme technické prohlídky osobních a nákladních automobilů do 3,5t včetně přívěsů a motocyklů od pondělí do pátku.
"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Yellowtail&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <title>STK Písek | Stanice Technické Kontroly</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
