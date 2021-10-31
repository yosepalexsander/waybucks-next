import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';


export const createAxiosRequestConfig = (headers: AxiosRequestHeaders): AxiosRequestConfig => {
  const newConfig: AxiosRequestConfig = {
    headers
  }
  return newConfig
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});
  
instance.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    Cookies.remove('token')
    Cookies.remove('id')
  }
  return error.response;
});


/**User register
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function register<T>(data: Record<string, any>, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return instance.post<T>('/register', data, config)
}

/**User login
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function login<T>(data: Record<string, any>, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return instance.post<T>('/login', data, config)
}

/**Get user data with corresponding id
   * 
   * @param id user id
   * @returns response object
   */
export async function getUser<T>(id: string | undefined, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return instance.get<T>(`/users/${id}`, config)
}

/**Get all products from server
   * 
   * @returns response object
   */
export async function getProducts<T>(): Promise<AxiosResponse<T>> {
  return instance.get('/products')
}

/**Get product with corresponding id
   * 
   * @param id product id
   * @returns response object
   */
export async function getProduct<T>(id: string): Promise<T> {
  return instance.get(`/products/${id}`)
}

/**Request for get user carts.
   * 
   * @param option fetch API request options
   * @returns response object
   */
export async function getCarts<T>(): Promise<T> {
  return instance.get('/carts')
}

/**Request for get user transactions.
   * 
   * @returns response object
   */
export async function getUserTransactions<T>(): Promise<T> {
  return instance.get('/user-transactions')
}

/**Request for get all transactions (for admin).
   * 
   * @returns response object
   */
export async function getAllTransactions<T>(): Promise<T> {
  return instance.get('/transactions')
}
  
/**Request for post new product. This can be only used by admin
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function postProduct<T>(data: Record<string, string>, config: AxiosRequestConfig): Promise<T> {
  return instance.post('/products', data,  config)
}

/**Request for post new cart by user
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function postCart<T>(data: Record<string, string>, config: AxiosRequestConfig): Promise<T> {
  return instance.post('/carts', data,  config)
}

/**Request for post new transaction by user
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function postTransaction<T>(data: Record<string, string>, config: AxiosRequestConfig): Promise<T> {
  return instance.post('/transactions', data, config)
}

/**Request for update product by admin
   * 
   * @param id product to be udpated
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function updateProduct<T>(id: string, data: Record<string, string>, config: AxiosRequestConfig): Promise<T> {
  return instance.put(`/products/${id}`, data, config)
}
  
/**Request for update cart by user
   * 
   * @param id cart to be udpated
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function updateCart<T>(id: string, data: Record<string, string>, config: AxiosRequestConfig): Promise<T> {
  return instance.put(`/carts/${id}`, data, config)
}

/**Request for update transaction by user
   * 
   * @param id transaction to be udpated
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function updateTransaction<T>(id: string, data: Record<string, string>, config: AxiosRequestConfig): Promise<T> {
  return instance.put(`/transactions/${id}`, data, config)
}