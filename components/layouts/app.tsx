import type { ReactNode, ReactElement } from 'react';
import Head from 'next/head';
import Header from '@/components/organism/header';
import Footer from '@/components/organism/footer';
import { User } from 'interfaces/object';

type LayoutProps = {
  children: ReactNode
  user: User | null | undefined
  route: string
  head: {
    title?: string
    description?: string,
    extScript?: ReactElement<HTMLScriptElement>
  }
}
export default function Layout({ children, user, route, head }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} key="description"/>
        {head.extScript}
      </Head>
      <Header user={user}/>
      <main className="container">
        {children}
      </main>
      {route === 'landing' && (<Footer />)}
    </>
  );
}
