import { Address, Cart, Product, Topping, User } from './object';

export interface CommonResponse {
  message: string
}

export interface SigninResponse extends CommonResponse {
  payload: {
    id: string
    name: string
    email: string
    token: string
  }
}

export interface SignupResponse extends CommonResponse {
  payload: {
    name: string
    email: string
  }
}

export interface GetUserResponse extends CommonResponse {
  payload: User
}

export interface GetAddressResponse extends CommonResponse {
  payload: Address[]
}

export interface GetProductsResponse extends CommonResponse {
  payload: Product[]
}

export interface GetProductResponse extends CommonResponse {
  payload: Product
}

export interface GetToppingsResponse extends CommonResponse {
  payload: Topping[]
}

export interface PostCartRequest {
  product_id: number
  topping_id: number[]
  qty: number
  price: number
}

export interface GetCartsResponse extends CommonResponse {
  payload: Cart[]
}

export interface OrderRequest {
  product_id: number
  topping_id: number[]
  qty: number
  price: number
}
export interface TransactionRequest {
  name: string
  email: string
  address: string
  postal_code: number
  phone: string
  city: string
  status: string
  total: number
  service_fee: number
  orders: OrderRequest[]
}