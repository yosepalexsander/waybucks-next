import { ReactNode, useRef } from 'react';
import {CSSTransition} from 'react-transition-group';

type DrawerProps = {
  open: boolean
  children: ReactNode
  onClick(): void
}
export default function Drawer({open, children, onClick}: DrawerProps) {
  const nodeRef = useRef(null)
  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={open}
        timeout={300}
        classNames="drawer"
        unmountOnExit>
        <div className="drawer" ref={nodeRef}>
          <span className="backdrop" onClick={onClick}></span>
          <div className="drawer-paper">
            {children}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}
