import type { AppProps } from "next/app";
import { Poppins, Mulish } from "next/font/google";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import MainLayout from "../src/components/layouts/MainLayout";
import { UserContextProvider } from "src/context/UserContext";

const poppins = Poppins({
  weight: ["800", "600"],
  subsets: ["latin"],
  display: "fallback",
});
const oxygen = Mulish({
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
      <UserContextProvider>
        <MainLayout>
          <>
            <style jsx global>{`
              :root {
                --font-title: ${poppins.style.fontFamily};
                --font-text: ${oxygen.style.fontFamily};
              }
            `}</style>
            <Component {...pageProps} />
          </>
        </MainLayout>
      </UserContextProvider>
    </NextUIProvider>
  );
}
export default App;
