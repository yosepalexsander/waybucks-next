import React, { PureComponent } from 'react';

import styles from './menu.module.css';

export default class MenuItem extends PureComponent<{ tabIndex: number }> {
  render() {
    const { children, ...props } = this.props
    return (
      <li className={styles.menuItem} role="menuitem" {...props}>
        {children}
      </li>
    )
  }
}
