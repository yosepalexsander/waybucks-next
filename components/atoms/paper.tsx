import React, { CSSProperties, PureComponent } from 'react';

export default class Paper extends PureComponent<CSSProperties> {
  constructor(props: CSSProperties) {
    super(props);
  }

  render() {
    const {children, ...props} = this.props
    return <div style={props} className="paper">
      {children}
    </div>;
  }
}
