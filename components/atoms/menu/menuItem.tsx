import React, { PureComponent } from 'react'

import styles from './menu.module.css'

export default class MenuItem extends PureComponent {
  render() {
    return (
      <li className={styles.menuItem}>
        {this.props.children}
      </li>
    )
  }
}
