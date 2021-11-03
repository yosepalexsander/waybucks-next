import React, { PureComponent } from 'react'
import style from '@/components/atoms/loading.module.css'

export default class Loading extends PureComponent {
  render() {
    return (
      <div className={style.loadingWrapper}>
        <div className={style.loadingDualSpinner}><div className={style.loading}>
          <div></div><div></div><div></div>
        </div></div>
      </div>
    )
  }
}
