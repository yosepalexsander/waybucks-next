import Image from 'next/image';
import React, { PureComponent, ImgHTMLAttributes } from 'react';

export default class Avatar extends PureComponent<ImgHTMLAttributes<HTMLImageElement>> {
  render() {
    const {src, alt, children, width, height, onClick} = this.props
    return (
      <>
        <div className="img-container avatar" style={{width: width, height: height}} onClick={onClick}>
          {src ? (
            <Image src={src} alt={alt}
              layout="fill" 
              width={width} 
              height={height} 
              className="rounded-full"
            />
          ) : (
            <>{children}</>
          )}
        </div>
      </>
    )
  }
}
