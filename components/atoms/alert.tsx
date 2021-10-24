import { CheckIcon, CloseIcon, ErrorIcon, WarningIcon } from 'icons';
import React, { ButtonHTMLAttributes, PureComponent } from 'react';

import styles from './alert.module.css';

type AlertProps = ButtonHTMLAttributes<HTMLButtonElement> &  {
  severity: 'error' | 'success' | 'warning' | 'info',
  onClose?: () => void,
  open?: boolean
};
export class Alert extends PureComponent<AlertProps> {
  constructor(props: AlertProps) {
    super(props)
  }
  

  render() {
    const { severity, color, open, children, className, ...props } = this.props
    return (
      <>
        {severity === 'success' ? (
          <div className={`${styles.alert} ${styles.alertSuccess}`}>
            <CheckIcon size={28}/>
            <p className={styles.alertMessage}>{children}</p>
            {props.onClose && (<button onClick={props.onClose}><CloseIcon size={28} /></button>)}
          </div>
        ) : severity === 'error' ? (
          <div className={`${styles.alert} ${styles.alertError}`}>
            <ErrorIcon size={28}/>
            <p className={styles.alertMessage}>{children}</p>
            {props.onClose && (<button onClick={props.onClose}><CloseIcon size={28} /></button>)}
          </div>
        ) : severity === 'warning' ? (
          <div className="alert alert-warning">
            <WarningIcon size={28}/>
            <p className="alert-message">{children}</p>
            {props.onClose && (<button onClick={props.onClose}><CloseIcon size={28} /></button>)}
          </div>
        ) : ( 
          <div className="alert alert-info">
            <CheckIcon size={28}/>
            <p className="alert-message">{children}</p>
            {props.onClose && (<button onClick={props.onClose}><CloseIcon size={28} /></button>)}
          </div>
        )}
      </>
    )
  }
}

export default Alert

