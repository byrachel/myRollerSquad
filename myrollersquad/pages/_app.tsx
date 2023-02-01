import type { AppProps } from "next/app";
import { Poppins, Quicksand } from "@next/font/google";

const poppins = Poppins({weight: "700", subsets: ["latin"]});
const quicksand = Quicksand({weight: "400", subsets: ["latin"]});

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
       <style jsx global>{`
        :root {
          --font-title: ${poppins.style.fontFamily};
          --font-text: ${quicksand.style.fontFamily}
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
