import { ReactNode, useEffect, useRef, useState } from 'react';
import {createPortal} from 'react-dom';
import {CSSTransition} from 'react-transition-group';

type DrawerProps = {
  open: boolean,
  children: ReactNode,
  onClick(): void
}
export default function Drawer({open, children, ...props}: DrawerProps) {
  const nodeRef = useRef(null)
  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={300}
        classNames="drawer"
        unmountOnExit>
        <div className="drawer" {...props} ref={nodeRef}>
          <span className="backdrop" ></span>
          <div className="drawer-paper">
            {children}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}
