import type { ReactNode } from "react"

interface ButtonProps {
  variant: string | 'contained',
  color: string | 'primary',
  children: ReactNode
};

export default function Button({variant, color, children, ...props}: ButtonProps) {
  return (
    <>
    {variant === 'contained' ? (
      <>
        {color === 'primary' && <button className="btn btn-primary" {...props}>{children}</button>}
        {color === 'secondary' && <button className="btn btn-secondary" {...props}>{children}</button> }
      </>
    ) : ( 
      <>
      {color === 'primary' && <button className="btn btn-primary-outlined" {...props}>{children}</button>}
      {color === 'secondary' && <button className="btn btn-secondary-outlined" {...props}>{children}</button>}
      </>
    )}
    </>
  )
}
