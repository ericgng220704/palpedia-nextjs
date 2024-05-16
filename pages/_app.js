import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import MainNav from "@/components/main-nav";
import Head from "next/head";

export default function App({ Component, pageProps }) {
     return (
          <SessionProvider session={pageProps.session}>
               <Head>
                    <meta
                         name="viewport"
                         content="width=device-width, initial-scale=1.0"
                    />
               </Head>
               <MainNav />
               <div className="main-wrapper">
                    <Component {...pageProps} />
               </div>
          </SessionProvider>
     );
}
