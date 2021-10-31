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
  createdAt: Date,
  updatedAt: Date
}