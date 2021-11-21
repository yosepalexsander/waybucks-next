import Link from 'next/link';
import Image from 'next/image';
import Empty from 'public/assets/images/empty_cart.svg';

export default function CartEmpty() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-center">
      <div className="img-container max-w-md h-64">
        <Image alt="empty cart" src={Empty} layout="responsive" width={100} height={100}/>
      </div>
      <p>Your cart is empty</p> 
      <p>Let&apos;s go to <Link href="/product"><a className="text-blue-600">menu</a></Link> and buy some coffeee</p>
    </div>
  )
}
