import { useState, FocusEvent } from 'react';
import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Error from 'next/error';
import cookies from 'next-cookies';
import useSWR from 'swr';

import Layout from '@/components/layouts/app';
import Card from '@/components/moleculs/card';
import InputSearch from '@/components/moleculs/inputSearch';

import { createAxiosRequestConfig, getProducts, getUser } from 'utils/api';
import { Product, User } from 'interfaces/object';
import { GetProductsResponse, GetUserResponse } from 'interfaces/api';

import NoData from 'public/assets/images/no_data.svg';

type ProductsProps = {
  user: User | null
}
export default function ProductPage({user}: ProductsProps) {
  const {data: productData, error: productError} = useSWR<GetProductsResponse>('products', getProducts, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 404) return
      if (retryCount >= 5) return
      setTimeout(() => revalidate({ retryCount }), 5000)
    }
  })
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (e: FocusEvent<HTMLInputElement>) => setSearchQuery(e.target.value)

  const filterProducts = (products: Product[] | undefined, query: string | null) => {
    if (!query) {
      return products
    }

    return products?.filter((product: Product) => product.name.toLowerCase().indexOf(query) !== -1)
  }
  const filteredProducts = filterProducts(productData?.payload, searchQuery)

  if (productError && productError.status >= 500) return <Error statusCode={productError.status} title={productError.message}/>
  return (
    <Layout
      head={{
        title: 'Products | Waysbucks Coffee',
        description: 'All product list in Waysbucks coffee'
      }}
      user={user} route="product">
      <div className="text-center mt-4 p-3">
        <InputSearch onChange={handleSearch}/>
      </div>
      {(productError && productError.status === 404) && (
        <div className="flex flex-col justify-center items-center w-full">
          <div className="img-container max-w-md mb-4">
            <Image src={NoData} alt="no data" layout="responsive" width={50} height={50} objectFit="cover" quality={70}/>
          </div>
          <p>Looks like there is no product</p>
          <Link href={{pathname: '/'}}>
            <a className="text-blue-600">Back to Home</a>
          </Link>
        </div>
      )}
      {!productData && !productError ? (
        <div className="product-container">
          {[1,2,3,4].map((index) => (
            <div key={index} className="p-2 w-80 sm:w-60">
              <div className="card skeleton skeleton-wave">
                <span className="card-image"></span>
                <span className="card-content"></span>
                <span className="card-content"></span>
              </div>
            </div>
          ))}
        </div>
      ): (
        <>
          {filteredProducts?.length != 0 ? (
            <div className="product-container">
              {filteredProducts?.map(product => (
                <Link key={product.id} href={{pathname: `/product/${product.id}`}}>
                  <a className="p-2 w-80 sm:w-60">
                    <Card item={product}/>
                  </a>
                </Link>
              ))}
            </div>
          ): (
            <div>
              <p className="h3 text-center mt-12">No Matching Result</p>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<ProductsProps> = async (ctx): Promise<GetServerSidePropsResult<ProductsProps>> => {
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