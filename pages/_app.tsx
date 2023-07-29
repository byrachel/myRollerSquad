import type { AppProps } from "next/app";
import { Poppins, Montserrat } from "next/font/google";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

import MainLayout from "../views/components/layouts/MainLayout";

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

import "../views/styles/globals.scss";
import "../views/styles/common.scss";
import "../views/styles/flow.scss";
import "../views/styles/profile.scss";

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

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <SessionProvider session={session}>
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
      </SessionProvider>
    </NextUIProvider>
  );
}
export default App;
