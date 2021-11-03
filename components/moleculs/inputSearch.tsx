import React, { PureComponent, FocusEvent } from 'react'

type InputSearchProps = {
  onChange: (e: FocusEvent<HTMLInputElement>) => void
}
export default class InputSearch extends PureComponent<InputSearchProps> {
  render() {
    return (
      <input type="text" className="input-search" id="search" name="search" placeholder="Search..." onChange={this.props.onChange} />
    )
  }
}
