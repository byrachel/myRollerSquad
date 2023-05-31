import { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@nextui-org/react";
import Footer from "@/components/footer/Footer";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {CssBaseline.flush()}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="modal-root"></div>
      </body>
      <Footer />
    </Html>
  );
}
