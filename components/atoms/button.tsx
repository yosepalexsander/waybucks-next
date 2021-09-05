import type {  ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &  {
  variant: 'contained' | 'outlined',
  color: 'secondary' | 'primary',
};

export default function Button({variant, color, children, className, ...props}: ButtonProps) {
  return (
    <>
      {variant === 'contained' ? (
        <>
          {color === 'primary' && <button className={`btn btn-primary ${className}`}  {...props}>{children}</button>}
          {color === 'secondary' && <button className={`btn btn-secondary ${className}`} {...props}>{children}</button> }
        </>
      ) : ( 
        <>
          {color === 'primary' && <button className={`btn btn-primary-outlined ${className}`} {...props}>{children}</button>}
          {color === 'secondary' && <button className={`btn btn-secondary-outlined ${className}`} {...props}>{children}</button>}
        </>
      )}
    </>
  )
}
