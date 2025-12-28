import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import "../styles/global.scss";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalLog = console.log;
    console.log = (...args: unknown[]) => {
      const firstArg = args[0];
      if (typeof firstArg === "string" && firstArg.includes("Hover effect by Robin Delaporte")) {
        return;
      }
      originalLog(...args);
    };

    const handleCopy = (event: ClipboardEvent) => event.preventDefault();
    const handleCut = (event: ClipboardEvent) => event.preventDefault();
    const handleSelectStart = (event: Event) => event.preventDefault();
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && (event.key === "c" || event.key === "x")) {
        event.preventDefault();
      }
    };
    const handleContextMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("img")) {
        event.preventDefault();
      }
    };
    const handleDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("img")) {
        event.preventDefault();
      }
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      console.log = originalLog;
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

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
