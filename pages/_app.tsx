import type { AppProps } from "next/app";
import { Poppins, Oxygen } from "next/font/google";

import MainLayout from "../src/components/layouts/MainLayout";
import { UserContextProvider } from "src/context/UserContext";

const poppins = Poppins({
  weight: ["800", "600"],
  subsets: ["latin"],
  display: "fallback",
});
const oxygen = Oxygen({
  weight: ["300", "700"],
  subsets: ["latin"],
  display: "fallback",
});

import "../src/styles/globals.scss";
import "../src/styles/common.scss";
import "../src/styles/flow.scss";
import "../src/styles/profile.scss";

function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
export default App;
