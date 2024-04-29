import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react/dist";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
    const router = useRouter();

    return (
        <NextUIProvider navigate={router.push}>
            <AnimatePresence mode="wait" initial={false}>
                <Component {...pageProps} />
            </AnimatePresence>
        </NextUIProvider>);
  
}
