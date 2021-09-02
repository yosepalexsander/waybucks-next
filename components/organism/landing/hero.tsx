import Image from 'next/image';

import HeroBg from 'public/assets/images/banner.png';
import HeroImg from 'public/assets/images/hero-img.png';

export default function Hero() {
  return (
    <section className="hero">
      <h1>Waysbucks</h1>
      <br />
      <div className="description">
        <p>Things are changing, but we’re still here for you</p>
        <br/>
        <p>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available</p>
        <br/>
        <p>Let’s Order...</p>
      </div>
      <div className="hero-img">
        <Image alt="hero" src={HeroImg} layout="fill" objectFit="cover" className="rounded-r-md"/>
      </div>
      <div className="hero-bg">
        <Image alt="hero background" src={HeroBg} layout="fill" objectFit="cover" className="rounded-md"/>
      </div>
    </section>
  )
}
