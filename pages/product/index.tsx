import { useState } from 'react'
import type { GetStaticProps, GetStaticPropsResult } from 'next'
import useSWR from 'swr'
import {AxiosResponse} from 'axios'
import { authSSG } from 'utils/auth'
import { Product, User } from 'interfaces/object'
import { getProducts } from 'utils/api'
import { GetProductsResponse } from 'interfaces/api'
type ProductsPageProps = {
  user: User | null
}
export default function Products(props: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([])
  const {data, error} = useSWR<AxiosResponse<GetProductsResponse>, Error>('user', getProducts)
  console.log(data)
  return (
    <div />
  );
}

export const getStaticProps: GetStaticProps<ProductsPageProps> = async (): Promise<GetStaticPropsResult<ProductsPageProps>> => {
  const user = await authSSG()

  return {
    props: {
      user,
    },
  }
}