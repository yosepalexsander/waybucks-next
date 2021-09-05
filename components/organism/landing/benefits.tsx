import Image from 'next/image';
import benefitOne from 'public/assets/images/benefit-1.png'; 
import benefitTwo from 'public/assets/images/benefit-2.png'; 
import benefitThree from 'public/assets/images/benefit-3.png'; 
export default function Benefit() {
  return (
    <section id="benefits">
      <h2 className="section-title">Why Waysbucks?</h2>
      <article id="benefit-one">
        <div className="img-container benefit-img">
          <Image src={benefitOne} alt="benefit one" layout="fill" objectFit="cover" className="img rounded-md"/>
        </div>
        <div className="benefit-desc">
          <h2>Quality First</h2>
          <p>Waysbucks concern in quality first to serve the best coffee</p>
        </div>
      </article>
      <article id="benefit-two">
        <div className="img-container benefit-img">
          <Image src={benefitTwo} alt="benefit two" layout="fill" objectFit="cover" className="img rounded-md"/>
        </div>
        <div className="benefit-desc">
          <h2>Accessibility</h2>
          <p>You can find and buy our products via online or just visit our branch stores spread across several areas</p>
        </div>
      </article>
      <article id="benefit-three">
        <div className="img-container benefit-img">
          <Image src={benefitThree} alt="benefit three" layout="fill" objectFit="cover" className="img rounded-md"/>
        </div>
        <div className="benefit-desc">
          <h2>Varied Menu</h2>
          <p>Waysbuck provide over 150+ variants and also various toppings that you can combine them</p>
        </div>
      </article>
    </section>
  )
}
