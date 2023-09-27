import {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'; ;

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="shortcut icon" href="icon_cake.png" type="image/x-icon" />
      <link rel={'stylesheet'}
        href={'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap'}/>
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
