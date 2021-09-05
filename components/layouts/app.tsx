import type { ReactElement } from 'react';

type LayoutProps = {
  children: ReactElement
}
export default function Layout({ children }: LayoutProps) {
  return (
    <main className="container">
      {children}
    </main>
  );
}
