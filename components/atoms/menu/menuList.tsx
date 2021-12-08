import React, { PureComponent } from 'react';

import styles from './menu.module.css';

export default class MenuList extends PureComponent {
  render() {
    return (
      <ul className={styles.menuList} role="menu" tabIndex={-1}>
        {this.props.children}
      </ul>
    )
  }
}
