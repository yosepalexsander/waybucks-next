import type {  ButtonHTMLAttributes } from 'react'
import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'

import { CheckIcon, CloseIcon, ErrorIcon, WarningIcon } from 'icons'

type AlertProps = ButtonHTMLAttributes<HTMLButtonElement> &  {
  severity: 'error' | 'success' | 'warning' | 'info',
  onClose: () => void,
  open?: boolean
};
export class Alert extends PureComponent<AlertProps> {
  private nodeRef: React.RefObject<HTMLDivElement>
  constructor(props: AlertProps) {
    super(props)
    this.nodeRef = React.createRef();
  }

  render() {
    const { severity, color, open, children, className, ...props } = this.props

    return (
      <>
        <CSSTransition
          in={open}
          timeout={500}
          classNames="alert"
          unmountOnExit
          nodeRef={this.nodeRef}
        >
          <div className="paper" ref={this.nodeRef}>
            <div className="backdrop" onClick={props.onClose}></div>
            {severity === 'success' ? (
              <div className="alert alert-success">
                <CheckIcon size={28}/>
                <p className="alert-message">{children}</p>
                {props.onClose && (<button className="alert-close" onClick={props.onClose}><CloseIcon  size={28} /></button>)}
              </div>
            ) : severity === 'error' ? (
              <div className="alert alert-error">
                <ErrorIcon size={28}/>
                <p className="alert-message">{children}</p>
                {props.onClose && (<button className="alert-close" onClick={props.onClose}><CloseIcon  size={28} /></button>)}
              </div>
            ) : severity === 'warning' ? (
              <div className="alert alert-warning">
                <WarningIcon size={28}/>
                <p className="alert-message">{children}</p>
                {props.onClose && (<button className="alert-close" onClick={props.onClose}><CloseIcon  size={28} /></button>)}
              </div>
            ) : ( 
              <div className="alert alert-info">
                <CheckIcon size={28}/>
                <p className="alert-message">{children}</p>
                {props.onClose && (<button className="alert-close" onClick={props.onClose}><CloseIcon  size={28} /></button>)}
              </div>
            )}
          </div>
        </CSSTransition>
      </>
    )
  }
}

export default Alert

