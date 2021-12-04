import type { GetServerSidePropsContext, GetStaticPropsContext, NextPageContext } from 'next';
import Router from 'next/router';
import cookies from 'next-cookies';
import cookie from 'js-cookie';
import { createAxiosRequestConfig, getUser } from 'utils/api';
import { GetUserResponse } from 'interfaces/api';
import { User } from 'interfaces/object';

/** Authentication for SSR Pages 
 * 
 * @param ctx Next SSR props context
 * @returns User data
 */
export const authSSR = async (ctx: GetServerSidePropsContext): Promise<User | null> => {
  const { id, token } = cookies(ctx)
  const config = createAxiosRequestConfig({
    Authorization: `Bearer ${token}`
  })
  const response = await getUser<GetUserResponse>(id, config)
  const user = response.payload
  if (user) {
    return user
  } else {
    if (typeof window === 'undefined') {
      ctx.res?.writeHead(302, { Location: '/signin' });
      ctx.res?.end();
    } else {
      Router.push(
        {
          pathname: '/signin',
        },
        '/signin'
      );
    }
    return null
  }
}

/** Authentication for SSG Pages 
 * 
 * @param
 * @returns User data
 */
export const authCSR =  async (): Promise<GetUserResponse | null> => {
  const id = cookie.get('id')
  const token = cookie.get('token')
  
  const config = createAxiosRequestConfig({
    Authorization: `Bearer ${token}`
  })
  
  const response = await getUser<GetUserResponse>(id, config)
  
  if (response.payload) {
    return response
  }
  const error = new Error('Authentication failed')
  throw error
}

export const authLogout = () => {
  cookie.remove('id');
  cookie.remove('token')
  // To support logging out from all windows
  window.localStorage.setItem('logout', Date.now().toString());
  Router.push('/signin');
};

export const authLogin = ({id, token, redirect}: {id: string, token: string, redirect: string}) => {
  cookie.set('id', id, {
    expires: 1
  })
  cookie.set('token', token, {
    expires: 1
  })
  
  Router.push(redirect) 
}

