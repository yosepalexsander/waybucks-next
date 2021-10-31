import '@/styles/globals.css';
import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <div>
      <Head>
        <meta httpEquiv="Content-Type" content="charset=UTF-8" key="content-type"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport"/>
        <meta name="description" content="Waybucks for your coffee time" key="description"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
  
}
