import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useState, FocusEvent } from 'react';
import Link from 'next/link';
import cookies from 'next-cookies';
import useSWR from 'swr';

import Layout from '@/components/layouts/app';
import Card from '@/components/moleculs/card';
import InputSearch from '@/components/moleculs/inputSearch';

import { createAxiosRequestConfig, getProducts, getUser } from 'utils/api';
import { Product, User } from 'interfaces/object';
import { GetProductsResponse, GetUserResponse } from 'interfaces/api';


type ProductsProps = {
  user: User | null
}
export default function Products({user}: ProductsProps) {
  const {data: productData, error: productError} = useSWR<GetProductsResponse, Error>('products', getProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (e: FocusEvent<HTMLInputElement>) => setSearchQuery(e.target.value)

  const filterProducts = (products: Product[] | undefined, query: string | null) => {
    if (!query) {
      return products
    }

    return products?.filter((product: Product) => product.name.toLowerCase().indexOf(query) !== -1)
  }
  const filteredProducts = filterProducts(productData?.payload, searchQuery)

  return (
    <Layout
      head={{
        title: 'Products | Waysbucks Coffee'
      }}
      user={user} route="product">
      <div className="text-center mt-4 p-3">
        <InputSearch onChange={handleSearch}/>
      </div>
      {!productData && !productError ? (
        <div className="product-container">
          {[1,2,3,4].map((index) => (
            <div key={index} className="card skeleton skeleton-wave">
              <span className="card-image"></span>
              <span className="card-content"></span>
              <span className="card-content"></span>
            </div>
          ))}
        </div>
      ): (
        <>
          {filteredProducts?.length != 0 ? (
            <div className="product-container">
              {filteredProducts?.map(product => (
                <Link key={product.id} href={{pathname: `/product/${product.id}`}}>
                  <a className="p-3 w-4/5 sm:max-w-xs md:w-1/3">
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