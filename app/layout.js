'use client'
import { Inter } from "next/font/google";
import 'remixicon/fonts/remixicon.css'
import "./globals.css";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import Store from "./Store";
import 'aos/dist/aos.css'; // AOS styles
import { useEffect } from 'react';
import AOS from 'aos';
import Loading from "./components/organisms/Loading";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
    });
  }, []);
  let persistor = persistStore(Store)
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={Store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <GoogleOAuthProvider clientId="1040779469294-gron1r0eu22m5bt0mrksl5746lna91e3.apps.googleusercontent.com">
              {children}
            </GoogleOAuthProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

