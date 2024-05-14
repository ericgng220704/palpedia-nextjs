import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import MainNav from "@/components/main-nav";

export default function App({ Component, pageProps }) {
     return (
          <SessionProvider session={pageProps.session}>
               <MainNav />
               <div className="main-wrapper">
                    <Component {...pageProps} />
               </div>
          </SessionProvider>
     );
}
