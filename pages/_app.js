// pages/_app.js
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import ConfigProvider from "../hooks/configProvider";
import store, { persistor } from "../store";
import "../plugins";
import styles from "../styles/Home.module.css";
import "../styles/globals.css";
import "../styles/main.css";
import "../styles/topList.css";
import Head from "next/head";
import { SessionProvider } from 'next-auth/react';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const { metaTags, ...rest } = pageProps;
  return (
    <>
      <Head>
        {metaTags && Object.entries(metaTags).map(([property, content]) => (
          <meta key={property} property={property} content={content} />
        ))}
      </Head>
      <div className={styles.container}>
        <div className={styles.App} style={{ height: '100%' }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ConfigProvider>
                <SessionProvider session={session}>
                  <Component {...rest} />
                </SessionProvider>
              </ConfigProvider>
            </PersistGate>
          </Provider>
        </div>
      </div>
    </>
  );
};

export default MyApp;
