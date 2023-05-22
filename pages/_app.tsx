import type { AppProps } from "next/app";
import { Poppins, Montserrat } from "next/font/google";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import MainLayout from "../src/components/layouts/MainLayout";

const poppins = Poppins({
  weight: ["800", "600"],
  subsets: ["latin"],
  display: "fallback",
});
const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "fallback",
});

import "../src/styles/globals.scss";
import "../src/styles/common.scss";
import "../src/styles/flow.scss";
import "../src/styles/profile.scss";

const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#28152b",
      secondary: "#e4287d",
      error: "#ff0000",
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <MainLayout>
        <>
          <style jsx global>{`
            :root {
              --font-title: ${poppins.style.fontFamily};
              --font-text: ${montserrat.style.fontFamily};
            }
          `}</style>
          <Component {...pageProps} />
        </>
      </MainLayout>
    </NextUIProvider>
  );
}
export default App;
