import { ReactNode } from 'react';
import Head from 'next/head'
import Header from '@/components/organism/header'
import Footer from '@/components/organism/footer'
type LayoutProps = {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Waysbucks: Coffee For Everytime</title>
      </Head>
      <Header />
      <main className="container">
        {children}
      </main>
      <Footer />
    </>
  );
}
