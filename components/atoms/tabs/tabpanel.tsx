import type { ReactNode } from 'react';

type TabPanelProps = {
  id: string
  index: number
  value: number
  children?: ReactNode
  className?: string
  'aria-labelledby': string
}

export default function TabPanel(props: TabPanelProps) {
  const { id, index, value, children, ...rest } = props;
  return (
    <div
      role="tabpanel"
      aria-hidden={value !== index}
      id={`products-tabpanel-${index}`}
      {...rest}
    >
      {value === index && (<>{children}</>)}
    </div>
  );
}