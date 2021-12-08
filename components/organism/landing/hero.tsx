import Image from 'next/image';
import Link from 'next/link';
import HeroImg from 'public/assets/images/hero-img.png';


export default function Hero() {
  return (
    <section className="hero">
      <div className="description">
        <h1>Waysbucks</h1>
        <br />
        <p>Things are changing, but we’re still here for you</p>
        <br/>
        <p>Make your time more quality with a cup of coffee served by Waysbucks with modern packaging anywhere and anytime</p>
        <br/>
        <Link href="/product">
          <a className="btn cta">Let&apos;s Order</a>
        </Link>
      </div>
      <div className="hero-img">
        <Image alt="hero" src={HeroImg} layout="responsive" objectFit="cover" className="shadow-md" priority/>
      </div>
    </section>
  )
}
