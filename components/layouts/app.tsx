import type { ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/components/organism/header';
import Footer from '@/components/organism/footer';
import { User } from 'interfaces/object';

type LayoutProps = {
  children: ReactNode,
  user: User | null | undefined,
  route: string
}
export default function Layout({ children, user, route }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Waysbucks: Coffee For Everytime</title>
      </Head>
      <Header user={user}/>
      <main className="container">
        {children}
      </main>
      {route === 'landing' && (<Footer />)}
    </>
  );
}
