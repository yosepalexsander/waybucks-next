import { FocusEvent, useState } from 'react'
import { AxiosResponse } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWRImmutable from 'swr/immutable'

import Layout from '@/components/layouts/app'
import Toppings from '@/components/organism/toppings'
import Loading from '@/components/atoms/loading'

import { getProduct, getUser } from 'utils/api'
import { GetProductResponse, GetUserResponse } from 'interfaces/api'


export default function DetailProduct() {
  const router = useRouter()
  const {slug} = router.query 
  const {data: user, error: userError} = useSWRImmutable<GetUserResponse, Error>('user', getUser)
  const {data: product, error: productError} = useSWRImmutable<GetProductResponse, Error>(router.isReady ? `${slug}`: null,  getProduct)
  const [toppingIds, setToppingIds] = useState<number[]>([])
  const [toppingPrice, setToppingPrice] = useState<number[]>([])

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

  if(productError) {
    return <div>Error...</div>
  }
  return (
    <Layout 
      user={user?.payload}
      route="detail-product"
      head={{
        title: `Detail Product | Waysbucks Coffee`,
        description: 'Detail product Waysbucks'
      }}>
      {!product && !productError ? (
        <Loading />
      ) : (
        <div className="product" style={{minHeight: '70vh'}}>
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
            <p>Total: {currencyFormatter.format(total)}</p>
          </div>
        </div>
      )}
    </Layout>
  );
}

