import React, { PureComponent, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &  {
  variant: 'contained' | 'outlined',
  color: 'secondary' | 'primary' | 'danger' | 'warning',
};


export default class Button extends PureComponent<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props)
  }
  
  render() {
    const { variant, color, children, className, ...props } = this.props
    return (
      <>
        {variant === 'contained' ? (
          <>
            {color === 'primary' && <button className={`btn btn-primary ${className}`}  {...props}>{children}</button>}
            {color === 'secondary' && <button className={`btn btn-secondary ${className}`} {...props}>{children}</button> }
            {color === 'warning' && <button className={`btn btn-warning ${className}`} {...props}>{children}</button>}
            {color === 'danger' && <button className={`btn btn-danger ${className}`} {...props}>{children}</button>}
          </>
        ) : ( 
          <>
            {color === 'primary' && <button className={`btn btn-primary-outlined ${className}`} {...props}>{children}</button>}
            {color === 'secondary' && <button className={`btn btn-secondary-outlined ${className}`} {...props}>{children}</button>}
            {color === 'warning' && <button className={`btn btn-warning-outlined ${className}`} {...props}>{children}</button>}
            {color === 'danger' && <button className={`btn btn-danger-outlined ${className}`} {...props}>{children}</button>}
          </>
        )}
      </>
    )
  }
}