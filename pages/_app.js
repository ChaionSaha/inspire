import Layout from "@/components/global/Layout";
import store from "@/lib/store";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import NextNProgress from 'nextjs-progressbar';
import { Provider } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function App({ Component, pageProps: {session, ...pageProps}}) {
    const router = useRouter();

    return (
        <>
            <NextNProgress color="black" options={{ showSpinner: false }} />
            <SessionProvider session={session}>
                <Provider store={store}>
                    <NextUIProvider navigate={router.push}>
                        <AnimatePresence mode="wait" initial={false}>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </AnimatePresence>
                    </NextUIProvider>
                </Provider>
            </SessionProvider>
        </>
    );
  
}

