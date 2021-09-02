import Image from "next/image";
import featureOne from "public/assets/images/feature-1.svg";
import featureTwo from "public/assets/images/feature-2.svg";
import featureThree from "public/assets/images/feature-3.svg";


export default function Features() {
  return (
    <section id="features">
      <div id="feature-one">
        <div className="feature-img img-container">
          <Image src={featureOne} alt="high quality" layout="fill" objectFit="cover" className="img rounded-md"/>
        </div>
        <div className="feature-desc">
          <p className="h4 mb-3">High Quality</p>
          <p>Waysbucks presents products with high quality ingredients but at competitive prices</p>
        </div>
      </div>
      <div id="feature-two">
        <div className="feature-img img-container">
          <Image src={featureTwo} alt="order from anywhere" layout="fill" objectFit="cover" className="img rounded-md"/>
        </div>
        <div className="feature-desc">
          <p className="h4 mb-3">Order From Anywhere</p>
          <p>You can order anywhere and anytime via the internet or you can directly visit our store</p>
        </div>
      </div>
      <div id="feature-three">
        <div className="feature-img img-container">
          <Image src={featureThree} alt="eco-friendly packaging" layout="fill" objectFit="cover" className="img rounded-md"/>
        </div>
        <div className="feature-desc">
          <p className="h4 mb-3">Eco-friendly Packaging</p>
          <p>The packaging used by our products is environmentally friendly and can be recycled</p>
        </div>
      </div>
    </section>
  )
}
