import React, { HTMLAttributes, PureComponent } from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';

import Paper from '@/components/atoms/paper';
import MenuList from '@/components/atoms/menu/menuList';
import MenuItem from '@/components/atoms/menu/menuItem';
import styles from '@/components/moleculs/dropdown.module.css';

import { AccountIcon, LogoutIcon } from 'icons';


type DropdownProps = HTMLAttributes<HTMLElement> & {
  userId: number
  open: boolean
  handleClose: () => void
  handleLogout: () => void
}

export default class Dropdown extends PureComponent<DropdownProps> {
  private nodeRef: React.RefObject<HTMLDivElement>
  constructor(props: DropdownProps) {
    super(props)
    this.nodeRef = React.createRef();
  }
  render() {
    const {userId, open, handleClose, handleLogout, ...props} = this.props
    return (
      <CSSTransition
        in={open}
        timeout={300}
        classNames={{
          appear: styles.dropdown,
          enter: styles.dropdownEnter,
          enterActive: styles.dropdownEnterActive,
          exit: styles.dropdownExit,
          exitActive: styles.dropdownExitActive
        }}
        unmountOnExit
        nodeRef={this.nodeRef}
      >
        <div className={styles.dropdown} ref={this.nodeRef} {...props}>
          <div className="backdrop" onClick={handleClose}></div>
          <Paper width={150} maxWidth="100%">
            <MenuList>
              <MenuItem>
                <Link href={{pathname: '/profile', query: {id: userId}}}>
                  <a>
                    <div>
                      <AccountIcon size={24} className="text-primary"/>
                    </div>
                    <span>Account</span>
                  </a>
                </Link>
              </MenuItem>
              <MenuItem>
                <button onClick={handleLogout}>
                  <div>
                    <LogoutIcon size={24} className="text-primary"/>
                  </div>
                  <p>Logout</p>
                </button>
              </MenuItem>
            </MenuList>
          </Paper>
        </div>
      </CSSTransition>
    )
  }
}
