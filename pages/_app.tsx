import type { AppProps } from "next/app";
import { Poppins, Oxygen } from "@next/font/google";

const bigPoppins = Poppins({ weight: "800", subsets: ["latin"] });
const poppins = Poppins({ weight: "600", subsets: ["latin"] });
const oxygen = Oxygen({ weight: ["300", "700"], subsets: ["latin"] });

import "../app/styles/globals.scss";
import "../app/styles/common.scss";
import "../app/styles/flow.scss";
import MainLayout from "../app/components/layouts/MainLayout";

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
