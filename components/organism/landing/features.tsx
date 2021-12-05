import Image from 'next/image';
import FeatureOne from 'public/assets/images/feature-1.svg';
import FeatureTwo from 'public/assets/images/feature-2.svg';
import FeatureThree from 'public/assets/images/feature-3.svg';


export default function Features() {
  return (
    <section id="features">
      <section id="feature-one">
        <div className="feature-img img-container">
          <Image src={FeatureOne} alt="high quality" layout="fill" objectFit="cover" className="img rounded-md" quality={70}/>
        </div>
        <div className="feature-desc">
          <h2 className="h4 mb-3">High Quality</h2>
          <p>Waysbucks presents products with high quality ingredients but at competitive prices</p>
        </div>
      </section>
      <section id="feature-two">
        <div className="feature-img img-container">
          <Image src={FeatureTwo} alt="order from anywhere" layout="fill" objectFit="cover" className="img rounded-md" quality={70}/>
        </div>
        <div className="feature-desc">
          <h2 className="h4 mb-3">Order From Anywhere</h2>
          <p>You can order anywhere and anytime via the internet or you can directly visit our store</p>
        </div>
      </section>
      <section id="feature-three">
        <div className="feature-img img-container">
          <Image src={FeatureThree} alt="eco-friendly packaging" layout="fill" objectFit="cover" className="img rounded-md" quality={70}/>
        </div>
        <div className="feature-desc">
          <h2 className="h4 mb-3">Eco-friendly Packaging</h2>
          <p>The packaging used by our products is environmentally friendly and can be recycled</p>
        </div>
      </section>
    </section>
  )
}
