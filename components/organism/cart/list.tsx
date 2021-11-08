import useSWR from 'swr';

import { Cart } from 'interfaces/object';
import { CommonResponse, GetCartsResponse } from 'interfaces/api';
import { createAxiosRequestConfig, deleteCart, getCarts, updateCart } from 'utils/api';

import CartItem from '@/components/organism/cart/item';
import CartSubtotal from '@/components/organism/cart/subtotal';
import Loading from '@/components/atoms/loading';



export default function Carts() {
  const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
  const {data: cartData, error, mutate} = useSWR<GetCartsResponse, Error>('/carts', getCarts, {
    revalidateOnFocus: false
  })
  //accumulation of all price in carts
  const subtotal = cartData?.payload.reduce((acc, curr) => {
    return acc + curr.price
  }, 0) || 0

  const serviceFee = subtotal * 0.05
  const total = subtotal + serviceFee

  const handleIncreaseQty = async (cart: Cart) => {
    try {
      const qty = cart.qty + 1
      const price = cart.price + (cart.price / cart.qty)
      const data: Record<string, any> = {
        qty: qty,
        price: price
      }
      const config = createAxiosRequestConfig({
        'Content-Type': 'application/json'
      })

      
      await updateCart<CommonResponse>(cart.id, data, config)

      //optimistic update local data
      const updatedCart: Cart = {
        ...cart,
        price,
        qty
      }
      const filteredData = cartData?.payload.filter(item => item.id != cart.id)
      const newCartData: GetCartsResponse = {
        message: cartData?.message as string,
        payload: [
          ...filteredData || [],
          updatedCart
        ].sort((a, b) => b.id - a.id)
      }

      await mutate(newCartData, false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDecreaseQty = async (cart: Cart) => {
    const qty = cart.qty > 1 ? cart.qty - 1 : cart.qty

    if (cart.qty != qty) {
      const price = cart.price - (cart.price / cart.qty)
      try {
        const data: Record<string, any> = {
          qty: qty,
          price: price
        }
  
        const config = createAxiosRequestConfig({
          'Content-Type': 'application/json'
        })
        await updateCart<CommonResponse>(cart.id, data, config)

        //optimistic update local data
        const updatedCart: Cart = {
          ...cart,
          price,
          qty
        }
        const filteredData = cartData?.payload.filter(item => item.id != cart.id)
        const newCartData: GetCartsResponse = {
          message: cartData?.message as string,
          payload: [
            ...filteredData || [],
            updatedCart
          ].sort((a, b) => b.id - a.id)
        }
  
        await mutate(newCartData, false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDeleteCart = async (id: number) => {
    await deleteCart<CommonResponse>(id)
    await mutate()
  }

  return (
    <div>
      {!cartData && !error ? (
        <Loading />
      ): (
        <>
          <div className="cart-list">
            {cartData?.payload.map(cart => (
              <CartItem key={cart.id} item={cart}  
                onDeleteCart={handleDeleteCart} 
                onIncreaseQty={handleIncreaseQty} 
                onDecreaseQty={handleDecreaseQty}/>
            ))}
          </div>
          <div className="cart-subtotal">
            <CartSubtotal 
              subtotal={currencyFormatter.format(subtotal)} 
              serviceFee={currencyFormatter.format(serviceFee)} 
              total={currencyFormatter.format(total)}/>
          </div>
        </>
      )}
    </div>
  )
}
