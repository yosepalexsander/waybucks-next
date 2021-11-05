import { FocusEvent, useState } from 'react'
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import Image from 'next/image'
import cookies from 'next-cookies'
import { useRouter } from 'next/router'
import useSWRImmutable from 'swr/immutable'

import Layout from '@/components/layouts/app'
import Toppings from '@/components/organism/toppings'
import Loading from '@/components/atoms/loading'

import { createAxiosRequestConfig, getProduct, getUser, postCart } from 'utils/api'
import Button from '@/components/atoms/button'
import Alert from '@/components/atoms/alert'

import { CommonResponse, GetProductResponse, GetUserResponse } from 'interfaces/api'
import { User } from 'interfaces/object'

type ProductProps = {
  user: User | null
}

export default function DetailProduct({user} : ProductProps) {
  const router = useRouter()
  const {slug} = router.query 
  const {data: product, error: productError} = useSWRImmutable<GetProductResponse, Error>(router.isReady ? `${slug}`: null,  getProduct)
  const [toppingIds, setToppingIds] = useState<number[]>([])
  const [toppingPrice, setToppingPrice] = useState<number[]>([])

  // show notification success or failed add product to cart
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const onCloseAlert = () => setShowAlert(false)

  // error state if request failed
  const [error, setError] = useState({
    isError: false,
    message: ''
  })

  const currencyFormatter = Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })
  const price = currencyFormatter.format(product?.payload.price as number)
  
  const onToppingChecked = (e: FocusEvent<HTMLInputElement>) => {
    if(e.target.checked) {
      setToppingIds(prev => [...prev, parseInt(e.target.id, 10)])
      setToppingPrice(prev => [...prev, parseInt(e.target.value, 10)])
    } else {
      setToppingIds(prev => prev.filter(item => item != parseInt(e.target.id, 10)))
      setToppingPrice(prev => prev.filter(item => item != parseInt(e.target.value, 10)))
    }
  }

  const total = toppingPrice.reduce<number>((sum, curr) => {
    return sum += curr
  }, product?.payload.price || 0)

  const onAddToCart = async (id: number | undefined) => {
    const data: Record<string, any> = {
      product_id: id,
      topping_id: toppingIds,
      qty: 1,
      price: total
    }

    const config = createAxiosRequestConfig({
      'Content-Type': 'application/json'
    })

    const response = await postCart<CommonResponse>(data, config)
    if (response.status === 200) {
      router.push('/cart')
    } else if(response.status === 401 || response.status === 400) {
      router.push('/signin')
    } else {
      setError({isError: true, message: response.data.message})
      setShowAlert(true) 
    }
  }
  return (
    <Layout 
      user={user}
      route="detail-product"
      head={{
        title: `Detail Product | Waysbucks Coffee`,
        description: 'Detail product Waysbucks'
      }}>
      {!product && !productError ? (
        <Loading />
      ) : (
        <div className="product">
          {error.isError && (
            <Alert 
              severity="error" 
              open={showAlert}
              position={{
                bottom: 35,
                right: 35,
              }} 
              onClose={onCloseAlert}>{error.message}</Alert>
          )}
          <div className="product-img">
            <Image 
              src={product?.payload.image as string} 
              alt={product?.payload.name} 
              layout="fill" 
              objectFit="cover" 
              className="rounded-md"/>
          </div>
          <div className="product-info">
            <p className="name">{product?.payload.name}</p>
            <p className="desc">{product?.payload.description}</p>
            <p className="price">Price: {price}</p>
            <p className="text-2xl font-bold">Topping</p>
            <Toppings onChange={onToppingChecked}/>
            <div className="flex justify-between">
              <p className="total">Total:</p>
              <p className="total">{currencyFormatter.format(total)}</p>
            </div>
            <Button 
              variant="contained" 
              color="primary" 
              className="w-full" 
              onClick={() => onAddToCart(product?.payload.id)}>Add To Cart</Button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<ProductProps> = async (ctx): Promise<GetServerSidePropsResult<ProductProps>> => {
  const { id, token } = cookies(ctx)
  const config = createAxiosRequestConfig({
    Authorization: `Bearer ${token}`
  })

  if (id && token) {
    const data = await getUser<GetUserResponse>(id, config)
    if (data.payload) {
      return {
        props: {
          user: data.payload
        }
      }
    }
  }
  return {
    props: {
      user: null
    }
  }
}