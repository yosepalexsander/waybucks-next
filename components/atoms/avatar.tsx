import Image from 'next/image';
import React, { PureComponent, ImgHTMLAttributes } from 'react';

export default class Avatar extends PureComponent<ImgHTMLAttributes<HTMLDivElement>> {
  render() {
    const {src, alt, children, width, height, ...props} = this.props
    return (
      <>
        <div className="img-container avatar" style={{width: width, height: height}} {...props}>
          {src ? (
            <Image src={src} alt={alt}
              layout="fill" 
              objectFit="cover"
              className="rounded-full"
            />
          ) : (
            <p>{children}</p>
          )}
        </div>
      </>
    )
  }
}
