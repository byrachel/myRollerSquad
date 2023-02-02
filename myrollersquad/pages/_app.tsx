import type { AppProps } from "next/app";
import { Poppins, Oxygen } from "@next/font/google";

const poppins = Poppins({weight: "700", subsets: ["latin"]});
const oxygen = Oxygen({weight: "300", subsets: ["latin"]});

import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
       <style jsx global>{`
        :root {
          --font-title: ${poppins.style.fontFamily};
          --font-text: ${oxygen.style.fontFamily}
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
