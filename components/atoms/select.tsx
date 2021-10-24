import type { InputHTMLAttributes } from 'react'
import React, { PureComponent } from 'react'

type SelectProps = InputHTMLAttributes<HTMLSelectElement> &  {
  labelId: 'string'
};

export class Select extends PureComponent<SelectProps> {
  constructor(props: SelectProps) {
    super(props)
  }
  
  render() {
    const {className, labelId, children,  ...props} = this.props
    return (
      <select className={`form-control ${className}`} {...props}>
        {children}
      </select>
    )
  }
}

export default Select