import React, { CSSProperties, HTMLAttributes, PureComponent } from 'react';

export default class Paper extends PureComponent<CSSProperties> {
  private style: CSSProperties;
  constructor(props: CSSProperties) {
    super(props);
    this.style = {
      width: this.props.width,
      maxWidth: this.props.maxWidth,
    };
  }

  render() {
    return <div style={this.style} className="paper">
      {this.props.children}
    </div>;
  }
}
