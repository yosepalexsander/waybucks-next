import { useState, FocusEvent } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { createAxiosRequestConfig, getProducts, getUser } from 'utils/api'
import { Product, User } from 'interfaces/object'
import { GetProductsResponse, GetUserResponse } from 'interfaces/api'

import Layout from '@/components/layouts/app'
import Card from '@/components/moleculs/card'
import InputSearch from '@/components/moleculs/inputSearch'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import cookies from 'next-cookies'
import Loading from '@/components/atoms/loading'

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

  if (!productData && !productError) {
    return <Loading />
  }

  return (
    <Layout user={user} route="product">
      <div className="text-center mt-4">
        <InputSearch onChange={handleSearch}/>
      </div>
      {filteredProducts?.length != 0 ? (
        <div className="flex justify-around flex-wrap mt-4 md:justify-start w-full mx-auto">
          <>
            {filteredProducts?.map(product => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <a className="p-3 w-2/5 md:w-1/3 md:max-w-xs">
                  <Card item={product}/>
                </a>
              </Link>
            ))}
          </>
        </div>
      ): (
        <div>
          <p className="h3 text-center mt-12">No Matching Result</p>
        </div>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<ProductsProps> = async (ctx): Promise<GetServerSidePropsResult<ProductsProps>> => {
  const { id, token } = cookies(ctx)
  const config = createAxiosRequestConfig({
    Authorization: `Bearer ${token}`
  })
  const {data, ...response} = await getUser<GetUserResponse>(id, config)
  if (response.status !== 200) {
    return {
      props: {
        user: null
      }
    }
  }
  return {
    props: {
      user: data.payload
    }
  }
}