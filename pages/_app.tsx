import React from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import "../styles/global.scss";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  return (
    <div>
      {/* <Head>
        <link rel="icon" href="public\Fav\favicon.ico" />
        <link rel="apple-touch-icon" href="public\Fav\apple-touch-icon.png" />
      </Head> */}
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        <Component {...pageProps} key={router.route} />
        <Analytics />
      </AnimatePresence>
    </div>
  );
}

export default MyApp;
