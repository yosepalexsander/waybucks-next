import { AriaAttributes, FunctionComponent } from 'react'

export type TabProps = AriaAttributes & {
  id: string
  label: string
  isActive?: boolean
  onClick?: () => void
}

const Tab: FunctionComponent<TabProps> = (props: TabProps) => {
  const { id, label, isActive, onClick, ...rest  } = props
  return (
    <button id={`${id}`} className={'tab' + (isActive ? ' tab-active': '')} role="tab" 
      tabIndex={isActive ? 0: -1}
      onClick={onClick}
      {...rest}>
      {label} 
    </button>
  )
}

export default Tab
