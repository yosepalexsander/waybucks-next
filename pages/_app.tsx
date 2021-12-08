import '@/styles/globals.css';
import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <div>
      <Head>
        <meta httpEquiv="Content-Type" content="charset=UTF-8" key="content-type"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=7" />
        <meta name="google-site-verification" content="HgHV0mp7qKlzrzdPxcAlsa1OlgV532cobrphWZgnvrc"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content="Waysbucks: coffee to make your time more meaningful" key="description"/>
        <meta name="theme-color" content="#CD1818" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
  
}
