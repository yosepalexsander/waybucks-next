import type { HTMLAttributes } from 'react'
import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'

import { CheckIcon, CloseIcon, ErrorIcon, WarningIcon } from 'icons'

import styles from '@/components/atoms/alert.module.css'

type AlertProps = HTMLAttributes<HTMLElement> &  {
  severity: 'error' | 'success' | 'warning' | 'info',
  onClose: () => void,
  open?: boolean,
  position?: {
    top?: number,
    left?: number,
    right?: number,
    bottom?: number
  }
};

export default class Alert extends PureComponent<AlertProps> {
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
          classNames={{
            appear: styles.alert,
            enter: styles.alertEnter,
            enterActive: styles.alertEnterActive,
            exit: styles.alertExit,
            exitActive: styles.alertExitActive
          }}
          unmountOnExit
          nodeRef={this.nodeRef}
        >
          <div className={styles.paper} ref={this.nodeRef} style={{
            top: props.position?.top,
            right: props.position?.right,
            bottom: props.position?.bottom,
            left: props.position?.left
          }}>
            <div className="backdrop" onClick={props.onClose}></div>
            {severity === 'success' ? (
              <div className={styles.alert + ' ' + styles.alertSuccess}>
                <CheckIcon size={28}/>
                <p className={styles.alertMessage}>{children}</p>
                {props.onClose && (<button className="alert-close" onClick={props.onClose}><CloseIcon  size={28} /></button>)}
              </div>
            ) : severity === 'error' ? (
              <div className={styles.alert + ' ' + styles.alertError}>
                <ErrorIcon size={28}/>
                <p className={styles.alertMessage}>{children}</p>
                {props.onClose && (<button className="alert-close" onClick={props.onClose}><CloseIcon  size={28} /></button>)}
              </div>
            ) : severity === 'warning' ? (
              <div className={styles.alert + ' ' + styles.alertWarning}>
                <WarningIcon size={28}/>
                <p className={styles.alertMessage}>{children}</p>
                {props.onClose && (<button className="alert-close" onClick={props.onClose}><CloseIcon  size={28} /></button>)}
              </div>
            ) : ( 
              <div className={styles.alert + ' ' + styles.alertInfo}>
                <CheckIcon size={28}/>
                <p className={styles.alertMessage}>{children}</p>
                {props.onClose && (<button className={styles.alertClose} onClick={props.onClose}><CloseIcon  size={28} /></button>)}
              </div>
            )}
          </div>
        </CSSTransition>
      </>
    )
  }
}

