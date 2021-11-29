import type { ReactNode } from 'react'
import Head from 'next/head'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <div>
      <Head>
        <meta name="description" content="Welcome back to Waysbucks coffee" key="description"/>
      </Head>
      <main className="screen-center bg-gray-300">
        {children}
      </main>
    </div>
  )
}
