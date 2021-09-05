import Image from 'next/image';
import Link from 'next/link';

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
        <p>Make your time more quality with a cup of coffee served by Waysbucks with modern packaging anywhere and anytime</p>
        <br/>
        <Link href="/products">
          <a className="btn cta">Let&apos;s Order</a>
        </Link>
      </div>
      <div className="hero-img">
        <Image alt="hero" src={HeroImg} layout="fill" objectFit="contain" className="rounded-r-md"/>
      </div>
      <div className="hero-bg">
        <Image alt="hero background" src={HeroBg} layout="fill" className="rounded-md"/>
      </div>
    </section>
  )
}
