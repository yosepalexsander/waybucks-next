import { SearchIcon } from 'icons'
import React, { Component } from 'react'

type InputSearchProps = {
  onChange: () => void 
}
export default class InputSearch extends Component<InputSearchProps> {
  render() {
    return (
      <div className="input">
        <SearchIcon />
        <input id="search" name="search" placeholder="Search..." onChange={this.props.onChange}/>
      </div>
    )
  }
}
