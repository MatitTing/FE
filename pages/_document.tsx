/* eslint-disable @next/next/no-sync-scripts */
import {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import Script from "next/script";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <body>
        <Main />
        <NextScript />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
};

export default Document;
