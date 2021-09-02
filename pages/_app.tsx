import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode,
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,
};
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div>
      <Head>
        <meta httpEquiv="Content-Type" content="charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport"/>
        <meta name="description" content="Waybucks for your coffee time" key="description"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {getLayout(<Component {...pageProps} />)}

    </div>
  )
  
}
