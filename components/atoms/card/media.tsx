import Image from 'next/image'
import React, { Component, ImgHTMLAttributes } from 'react'

export default class CardMedia extends Component<ImgHTMLAttributes<HTMLImageElement>> {
  render() {
    const {src, alt, height } =  this.props
    return (
      <div className="img-container relative" style={{ height: height, width: '100%'}}>
        {src && (<Image src={src} alt={alt} layout="fill" objectFit="cover"  quality={70} className="rounded-md"/>)}
      </div>
    )
  }
}
