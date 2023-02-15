import type { AppProps } from "next/app";
import { Poppins, Oxygen } from "@next/font/google";

const bigPoppins = Poppins({ weight: "800", subsets: ["latin"] });
const poppins = Poppins({ weight: "600", subsets: ["latin"] });
const oxygen = Oxygen({ weight: ["300", "700"], subsets: ["latin"] });

import "../styles/globals.scss";
import "../styles/common.scss"
import MainLayout from "../components/layouts/MainLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <>
        <style jsx global>{`
          :root {
            --font-bigTitle: ${bigPoppins.style.fontFamily};
            --font-title: ${poppins.style.fontFamily};
            --font-text: ${oxygen.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </>
    </MainLayout>
  );
}
