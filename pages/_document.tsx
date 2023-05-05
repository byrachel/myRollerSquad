import { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@nextui-org/react";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>{CssBaseline.flush()}</Head>
      <body>
        <Main />
        <NextScript />
        <div id="modal-root"></div>
      </body>
    </Html>
  );
}
