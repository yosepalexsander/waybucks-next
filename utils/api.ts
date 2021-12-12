import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import {  CommonResponse, RequestError, SigninResponse, TransactionRequest } from 'interfaces/api';
import Cookies from 'js-cookie';

const checkStatusRes = (status: number, errMsg: string) => {
  if (status != 200) {
    const error: RequestError = {
      name: 'API request',
      status: status,
      message: errMsg 
    }

    throw error
  }
}

export const createAxiosRequestConfig = (headers: AxiosRequestHeaders): AxiosRequestConfig => {
  const newConfig: AxiosRequestConfig = {
    headers
  }
  return newConfig
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});
  
instance.interceptors.request.use(request => {
  const token = Cookies.get('token') || ''
  if(request.headers && !request.headers.Authorization) request.headers.Authorization = `Bearer ${token}`

  return request
})
instance.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    Cookies.remove('token')
    Cookies.remove('id')
  }
  return error.response;
});


/**Request for user register
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function register<T>(data: Record<string, any>, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return instance.post<T>('/register', data, config)
}

/**Request for user login
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function signin<T extends SigninResponse>(data: Record<string, any>, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  try {
    const response = await instance.post<T>('/login', data, config)
    await axios.post('/api/signin', { 
      token: response.data.payload.token, 
      id: response.data.payload.id 
    }, { headers: { 'Content-Type': 'application/json' } });
    return response
  } catch (e) {
    throw new Error('Invalid Email or Password');
  }  
}

/**Request for user login
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function signout(): Promise<null> {
  return await axios.post('/api/signout', { }, { headers: { 'Content-Type': 'application/json' } });
}

/**Request for get user data with corresponding id
   * 
   * @param id user id
   * @returns response object
   */
export async function getUser<T>(id: string | undefined, config?: AxiosRequestConfig): Promise<T> {
  if (!id) id = Cookies.get('id')
  
  return (await instance.get<T>(`/users/${id}`, config)).data
}

/**Request for get address data with corresponding user id
   * 
   * @param id user id
   * @returns response object
   */
export async function getUserAddress<T>(config?: AxiosRequestConfig): Promise<T> {
  const response = await instance.get<T>('/address', config)
  checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable': '')
  return response.data
}

/**Request for get all products
   * 
   * @returns response object
   */
export async function getProducts<T>(): Promise<T> {
  const response = await instance.get<T>('/products')
  checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable': '')
  return response.data
}

/**Request for get product with corresponding id
   * 
   * @param id product id
   * @returns response object
   */
export async function getProduct<T>(id: string): Promise<T> {
  const response = await instance.get<T>(`/products/${id}`)
  checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable': '')
  return response.data
}

/**Request for get all toppings
   * 
   * @returns response object
   */
export async function getToppings<T>(): Promise<T> {
  const response = await instance.get<T>('/toppings')
  checkStatusRes(response.status, response.status === 503 ? 'Third Party Service Unavailable': '')
  return response.data
}

/**Request for get user carts.
   * 
   * @param option fetch API request options
   * @returns response object
   */
export async function getCarts<T>(): Promise<T> {
  const res =  await instance.get<T>('/carts')
  checkStatusRes(res.status, res.status === 503 ? 'Third Party Service Unavailable': '')
  return res.data
}

/**Request for get user transactions.
   * 
   * @returns response object
   */
export async function getUserTransactions<T>(): Promise<T> {
  return (await instance.get<T>('/user-transactions')).data
}

/**Request for get all transactions (for admin).
   * 
   * @returns response object
   */
export async function getAllTransactions<T>(): Promise<T> {
  return (await instance.get<T>('/transactions')).data
}
  
/**Request for post new user address
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function postAddress<T extends CommonResponse>(data: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  try {
    return await instance.post<T>('/address', data,  config)
  } catch (error: any) {
    throw new Error(error.message);
  }
}
/**Request for post new product. This can be only used by admin
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function postProduct<T extends CommonResponse>(data: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  try {
    return await instance.post<T>('/products', data,  config)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**Request for post new topping. This can be only used by admin
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function postTopping<T extends CommonResponse>(data: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  try {
    return await instance.post<T>('/toppings', data,  config)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**Request for post new cart by user
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function postCart<T extends CommonResponse>(data: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  try {
    return await instance.post<T>('/carts', data,  config)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**Request for post new transaction by user
   * 
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function postTransaction<T extends CommonResponse>(data: TransactionRequest, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  try {
    return await instance.post<T>('/transactions', data,  config)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**Request for update user 
   * 
   * @param id product to be udpated
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function updateUser<T extends CommonResponse>(
  id: number, 
  data: Record<string, any>, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  try {
    return await instance.put<T>(`/users/${id}`, data,  config)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**Request for update userAddress 
   * 
   * @param id product to be udpated
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function updateAddress<T extends CommonResponse>(
  id: number, 
  data: Record<string, any>, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  try {
    return await instance.put<T>(`/address/${id}`, data,  config)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**Request for update product by admin
   * 
   * @param id product to be udpated
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function updateProduct<T extends CommonResponse>(
  id: number, 
  data: Record<string, any>, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  try {
    return await instance.put<T>(`/products/${id}`, data,  config)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**Request for update topping by admin
   * 
   * @param id product to be udpated
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function updateTopping<T extends CommonResponse>(
  id: number, 
  data: Record<string, any>, 
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  try {
    return await instance.put<T>(`/toppings/${id}`, data,  config)
  } catch (error: any) {
    throw new Error(error.message);
  }
}
  
/**Request for update cart by user
   * 
   * @param id cart to be udpated
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function updateCart<T extends CommonResponse>(
  id: number, 
  data: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  try {
    return await instance.put<T>(`/carts/${id}`, data,  config)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**Request for update transaction by user
   * 
   * @param id transaction to be udpated
   * @param data request body
   * @param config axios request config
   * @returns response object
   */
export async function updateTransaction<T>(id: string, data: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return instance.put<T>(`/transactions/${id}`, data, config)
}

/**Request for delete user address
 * 
 * @param id address to be deleted
 * @returns response object
 */
export async function deleteAddress<T extends CommonResponse>(id: number): Promise<AxiosResponse<T>> {
  try {
    return await instance.delete<T>(`/address/${id}`)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**Request for delete user cart
 * 
 * @param id cart to be deleted
 * @returns response object
 */
export async function deleteCart<T extends CommonResponse>(id: number): Promise<AxiosResponse<T>> {
  try {
    return await instance.delete<T>(`/carts/${id}`)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**Request for delete product
 * 
 * @param id product to be deleted
 * @returns response object
 */
export async function deleteProduct<T extends CommonResponse>(id: number): Promise<AxiosResponse<T>> {
  try {
    return await instance.delete<T>(`/products/${id}`)
  } catch (error: any) {
    throw new Error(error.message);
  }
}
/**Request for delete topping
 * 
 * @param id topping to be deleted
 * @returns response object
 */
export async function deleteTopping<T extends CommonResponse>(id: number): Promise<AxiosResponse<T>> {
  try {
    return await instance.delete<T>(`/toppings/${id}`)
  } catch (error: any) {
    throw new Error(error.message);
  }
}

