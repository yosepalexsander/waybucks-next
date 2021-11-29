import type { ReactNode } from 'react'
import Head from 'next/head'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <div>
      <Head>
        <meta name="description" content="Sign up for amazing way to coffee discovery with Waysbucks" key="description"/>
        <title>Sign Up - Waysbucks Coffee</title>
      </Head>
      <main className="screen-center bg-gray-300">
        {children}
      </main>
    </div>
  )
}
