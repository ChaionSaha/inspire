import Layout from "@/components/global/Layout";
import store from "@/lib/store";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function App({ Component, pageProps}) {
    const router = useRouter();

    return (
        <Provider store={store}>
            <NextUIProvider navigate={router.push}>
                <AnimatePresence mode="wait" initial={false}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AnimatePresence>
            </NextUIProvider>
        </Provider>
    );
  
}

