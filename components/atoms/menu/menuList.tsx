import React, { PureComponent } from 'react'

import styles from './menu.module.css'

export default class MenuList extends PureComponent {
  render() {
    return (
      <ul className={styles.menuList}>
        {this.props.children}
      </ul>
    )
  }
}
