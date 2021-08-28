import type { ReactElement } from 'react';

type LayoutProps = {
  children: ReactElement
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      {children}
    </div>
  );
}
