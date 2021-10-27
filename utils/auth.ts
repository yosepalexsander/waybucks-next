import { NextPageContext } from 'next';
import Router from 'next/router';
import cookies from 'next-cookies';
import cookie from 'js-cookie';
import API, { createAxiosRequestConfig } from 'utils/api';
import { GetUserResponse } from 'interfaces/api';
import { User } from 'interfaces/object';

export const auth = async (ctx: NextPageContext): Promise<User | undefined> => {
  const { id } = cookies(ctx)
  const response = await API().getUser<GetUserResponse>(id)
  const user = response.data.payload
  if (response.status === 200) {
    return user
  } else {
    if (typeof window === 'undefined') {
      ctx.res?.writeHead(302, { Location: '/signin' });
      ctx.res?.end();
    } else {
      Router.push(
        {
          pathname: '/signin',
          query: { redirect: ctx.asPath },
        },
        '/signin'
      );
    }
  }
  return undefined
}

export const authLogout = () => {
  cookie.remove('id');
  // To support logging out from all windows
  window.localStorage.setItem('logout', Date.now().toLocaleString());
  Router.push('/login');
};

export const authLogin = ({id, token, redirect}: {id: string, token: string, redirect: string}) => {
  cookie.set('id', id, {expires: 1})
  cookie.set('token', token, {expires: 1})
  
  Router.push(redirect) 
}

