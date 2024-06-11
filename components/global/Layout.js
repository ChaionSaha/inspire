import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    const router = useRouter();
    return (
        <div className="relative">
            {
                router.asPath.includes('auth') ||
                    router.asPath.includes('invoice') ?
                    '' :
                    <Navbar />
            }
            {children}
            {
                router.asPath.includes('auth') ||
                    router.asPath.includes('invoice')
                    ? '' :
                    <Footer />
            }
        </div>
    )
}
