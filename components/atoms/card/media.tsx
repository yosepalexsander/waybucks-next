import Image from 'next/image'
import React, { Component, ImgHTMLAttributes } from 'react'

export default class CardMedia extends Component<ImgHTMLAttributes<HTMLImageElement>> {
  render() {
    const {src, alt, height } =  this.props
    return (
      <div className="img-container" style={{ height: height}}>
        {src && (<Image src={src} alt={alt} layout="fill" objectFit="cover"/>)}
      </div>
    )
  }
}
