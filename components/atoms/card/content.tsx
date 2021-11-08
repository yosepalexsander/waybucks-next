import React, { Component } from 'react';

export default class CardContent extends Component {
  render() {
    return (
      <div className="p-4">
        {this.props.children}
      </div>
    )
  }
}
