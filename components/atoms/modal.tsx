import React, { PureComponent, HTMLAttributes } from 'react'
import { CSSTransition } from 'react-transition-group'

import style from '@/components/atoms/modal.module.css'

type ModalProps = HTMLAttributes<HTMLElement> &  {
  onClose: () => void,
  open?: boolean,
};


export default class Modal extends PureComponent<ModalProps> {
  private nodeRef: React.RefObject<HTMLDivElement>
  constructor(props: ModalProps) {
    super(props)
    this.nodeRef = React.createRef();
  }
  render() {
    const { open, children, className, ...props } = this.props
    return (
      <CSSTransition
        in={open}
        timeout={300}
        classNames="modal"
        unmountOnExit
        nodeRef={this.nodeRef}
      >
        <div className="modal" ref={this.nodeRef}>
          <span className="backdrop" onClick={props.onClose}></span>
          {children}
        </div>
      </CSSTransition>
    )
  }
}
