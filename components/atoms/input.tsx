import React, { PureComponent, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
  label: string
  multiline?: boolean
  hintText: string
}
export default class Input extends PureComponent<InputProps> {
  constructor(props: InputProps) {
    super(props)
  }
  render() {
    const {className, multiline, hintText,  ...props} = this.props
    return (
      <div className={'form-control-root' + (multiline ? ` h-20`: ' h-10')}>
        {multiline && (
          <textarea className={className ? `form-control-input ${className}`: 'form-control-input'} {...props}>
            {hintText}
          </textarea>
        )}
        {!multiline && (
          <input className={className ? `form-control-input ${className}`: 'form-control-input'} {...props}/>
        )}
        {props.label && (<label className="form-label" htmlFor={props.id}>{props.label}</label>)}
      </div>
    )
  }
}