import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Navbar />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
