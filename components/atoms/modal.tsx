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
        timeout={500}
        classNames={{
          appear: style.modal,
          enter: style.modalEnter,
          enterActive: style.modalEnterActive,
          exit: style.modalExit,
          exitActive: style.modalExitActive
        }}
        unmountOnExit
        nodeRef={this.nodeRef}
      >
        <div className="modal" ref={this.nodeRef}>
          <div className="backdrop bg-gray-300 opacity-50" onClick={props.onClose}></div>
          {children}
        </div>
      </CSSTransition>
    )
  }
}
