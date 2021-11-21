import type { ReactNode } from 'react';

import style from '@/components/atoms/badge.module.css'

type BadgeProps = {
  color?: 'secondary' | 'primary',
  badgeContent?: number,
  children: ReactNode
};
export default function Badge({
  color,
  badgeContent,
  children
}: BadgeProps) {
  return (
    <span className={style.badge}>
      {children}
      {color === 'primary' ? (
        <span className={style.badgeContent + ' ' + style.primary}>{badgeContent && badgeContent > 0 ? badgeContent: null }</span>
      ): (
        <span className={style.badgeContent + ' ' + style.secondary}>{badgeContent && badgeContent > 0 ? badgeContent: null }</span>
      )}
    </span>
  )
}

