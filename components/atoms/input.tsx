import React, { PureComponent, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}
export default class Input extends PureComponent<InputProps> {
  constructor(props: InputProps) {
    super(props)
  }
  render() {
    const {className, ...props} = this.props
    return (
      <div className="form-control-root">
        <input className={className ? `form-control-input ${className}`: 'form-control-input'} {...props}/>
        {props.label && (<label className="form-label" htmlFor={props.id}>{props.label}</label>)}
      </div>
    )
  }
}