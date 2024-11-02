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
            <GoogleOAuthProvider clientId="6126168386-05469vbiq4beo44tpg0ff7g4m18hlkf0.apps.googleusercontent.com">
              {children}
            </GoogleOAuthProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

