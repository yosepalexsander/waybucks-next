import type { ReactNode } from 'react'
import Head from 'next/head'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <div>
      <Head>
        <meta name="description" content="Waybucks Signup" key="description"/>
        <title>Signup | Waysbucks Coffee</title>
      </Head>
      <main className="screen-center">
        {children}
      </main>
    </div>
  )
}
