import useSWRImmutable from 'swr/immutable';
import { useState, ChangeEvent } from 'react';

import CartItem from '@/components/organism/cart/item';
import CartSubtotal from '@/components/organism/cart/subtotal';
import CartSkeleton from '@/components/organism/cart/skeleton';
import CartEmpty from '@/components/organism/cart/empty';
import ListAddress from '@/components/organism/addresses';
import Button from '@/components/atoms/button';
import Alert from '@/components/atoms/alert';

import { Address, Cart, User } from 'interfaces/object';
import { CommonResponse, GetAddressResponse, GetCartsResponse, OrderRequest, PostTransactionResponse, TransactionRequest } from 'interfaces/api';
import { createAxiosRequestConfig, deleteCart, getCarts, getUserAddress, postTransaction, updateCart } from 'utils/api';

type CartProps = {
  user?: User | null
}

type StatusState = {
  msg: string
  status: 'success' | 'warning' | 'error'
}
export default function Carts({user}: CartProps) {
  const [alert, setAlert] = useState(false)
  const [status, setStatus] = useState<StatusState>({
    msg: '',
    status: 'success',
  })

  const currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
  const {data: cartData, error, mutate} = useSWRImmutable<GetCartsResponse>(`/carts/${user?.id}`, getCarts, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error?.status === 404) return
      if (retryCount >= 5) return
      setTimeout(() => revalidate({ retryCount }), 5000)
    }
  })
  const { data: addressData, error: addressError} = useSWRImmutable<GetAddressResponse, Record<string, any>>(`/address/${user?.id}`, getUserAddress, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error?.status === 404) return
    }
  })

  // accumulation of all price in carts
  const subtotal = cartData?.payload?.reduce((acc, curr) => {
    return acc + curr.price
  }, 0) || 0

  const serviceFee = subtotal * 0.05
  const total = subtotal + serviceFee

  const [devileryAddress, setDevileryAddress] = useState<Address>()

  const onClickAddress = (e: ChangeEvent<HTMLInputElement>, item: Address) => {
    if(e.target.checked) {
      setDevileryAddress(item)
    } else {
      setDevileryAddress(undefined)
    }
  }
  const handlePayment = async () => {
    if(!devileryAddress) {
      setStatus({
        status: 'warning',
        msg: 'Please select address',
      })
      return setAlert(true)
    }
    const orderReq: OrderRequest[] = cartData?.payload?.map(item => {
      const order: OrderRequest = {
        product_id: item.product.id,
        topping_id: item.toppings.map(topping => topping.id),
        qty: item.qty,
        price: item.price
      }
      return order
    }) || []
    const transactionReq: TransactionRequest = {
      name: devileryAddress?.name || '',
      email: user?.email || '',
      address: devileryAddress?.address || '',
      postal_code: devileryAddress?.postal_code || 0,
      phone: devileryAddress?.phone || '',
      city: devileryAddress?.city || '',
      status: 'pending',
      total: total,
      service_fee: serviceFee, 
      orders: orderReq
    }
    
    try {
      const config = createAxiosRequestConfig({
        'Content-Type': 'application/json'
      })
      const response = await postTransaction<PostTransactionResponse>(transactionReq, config)
      const { payload } = response.data
      if(!payload.token) {
        setStatus({
          status: 'error',
          msg: 'Midtrans Error',
        })
        return setAlert(true)
      }
      window.snap.pay(payload.token, {
        onSuccess: function () {
          console.log('success');
          setStatus({
            status: 'success',
            msg: 'Payment success!! Your order will be processed immediately',
          })
          setAlert(true)
          setTimeout(() => {
            mutate()
          }, 1500);
        },
        onPending: function (result: any) {
          console.log(result);
        },
        onError: function (result: any) {
          console.log(result);
          setStatus({
            status: 'success',
            msg: 'Payment failed!',
          })
          setAlert(true)
        },
        onClose: function () {
          console.log('customer closed the popup without finishing the payment');
        },
      });
    } catch (error) {
      console.log(error)
    }
  }

  const onMutationUpdate = async (cart: Cart) => {
    const filteredData = cartData?.payload.filter(item => item.id != cart.id) || []
    const newCartData: GetCartsResponse = {
      message: cartData?.message as string,
      payload: [
        ...filteredData,
        cart
      ].sort((a, b) => b.id - a.id)
    }

    await mutate(newCartData, false)
  }
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
      const updatedCart: Cart = { ...cart, price, qty }
      await onMutationUpdate(updatedCart)
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
        const updatedCart: Cart = { ...cart, price, qty }
        await onMutationUpdate(updatedCart)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDeleteCart = async (id: number) => {
    try {
      await deleteCart<CommonResponse>(id)
      const filteredCart = cartData?.payload.filter(item => item.id != id) || []
      const newCartData: GetCartsResponse = {
        message: cartData?.message as string,
        payload: filteredCart 
      }
      
      await mutate(newCartData, false)
    } catch (error) {
      console.log(error);
    }
  }

  if (!cartData && !error) return <CartSkeleton />
  
  return (
    <div>
      {error || cartData?.payload.length == 0 ? (
        <CartEmpty/>
      ): (
        <>
          <div className="cart-container flex-container">
            <div className="flex-item">
              <Alert open={alert} severity={status.status} onClose={() => setAlert(false)}
                position={{
                  bottom: 35,
                  left: 35,
                }}>
                {status.msg}
              </Alert>
              <p className="font-medium text-xl">Review Your Order</p>
              <hr className="divider" />
              <div className="cart-list">
                {cartData?.payload?.map(cart => (
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
            </div>
            {!addressData && !addressError ? (
              <div>
                <p>loading address...</p>
              </div>
            ): (
              <div className="flex-item">
                <p className="font-medium text-xl">Where will the products be sent to?</p>
                <hr className="divider mb-2" />
                <ListAddress items={addressData?.payload || []} onChange={onClickAddress}/>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-5 px-2 py-2">
            <Button 
              onClick={handlePayment} 
              color="primary" 
              variant="contained" 
              className="w-full sm:w-3/12">Pay</Button>
          </div>
        </>
      )}
    </div>
  )
}
