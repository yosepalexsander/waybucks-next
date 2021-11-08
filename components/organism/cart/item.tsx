import Image from 'next/image';
import { Cart } from 'interfaces/object';

import { DeleteIcon, MinusIcon, PlusIcon } from 'icons';

type CartItemProps = {
  item: Cart
  onIncreaseQty: (cart: Cart) => void
  onDecreaseQty: (cart: Cart) => void
  onDeleteCart: (id: number) => void
}

export default function CartItem({item, onDecreaseQty, onIncreaseQty, onDeleteCart}: CartItemProps) {
  const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
  const toppings = item.toppings.map(item => item.name).join(', ')

  return (
    <div className="cart-item">
      <div className="img-container cart-img">
        <Image src={item.product.image} alt={item?.product.name} layout="responsive" width={50} height={50} objectFit="cover" className="rounded-md"/>
      </div>
      <div className="cart-info flex-1">
        <p className="h4">{item.product.name}</p>
        <p className="text-sm">Topping: {toppings}</p>
      </div>
      <div className="cart-info items-end">
        <p>{currencyFormatter.format(item.price)}</p>
        <div className="qty">
          <DeleteIcon size="2rem" onClick={() => onDeleteCart(item.id)}/>
          <MinusIcon size="1.25rem" className="counter" onClick={() => onDecreaseQty(item)}/>
          <p className="mx-3">{item.qty}</p>
          <PlusIcon size="1.25rem" className="counter" onClick={() => onIncreaseQty(item)}/>
        </div>
      </div>
    </div>
  )
}
