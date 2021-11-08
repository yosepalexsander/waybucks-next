export interface User {
  id: number
  name: string
  email: string
  phone: string
  gender: string
  image: string
  is_admin: boolean
}

export interface Product {
	id: number
  name: string
  description: string
  image: string
  price: number
  createdAt: Date
  updatedAt: Date
}

export interface Topping {
  id: number
  name: string
  image: string
  price: number
  is_available: boolean
}

export interface Cart {
  id: number
  price: number
  qty: number
  product: Product
  toppings: Topping[]
}