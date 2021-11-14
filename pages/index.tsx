import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import cookies from 'next-cookies';
import Layout from '@/components/layouts/app';
import Hero from '@/components/organism/landing/hero';
import Benefits from '@/components/organism/landing/benefits';
import Features from '@/components/organism/landing/features';

import { getUser, createAxiosRequestConfig } from 'utils/api';
import { User } from 'interfaces/object';
import { GetUserResponse } from 'interfaces/api';

type HomeProps = {
  user: User | null
}

export default function HomePage({user}: HomeProps) {
  return (
    <Layout 
      user={user} 
      route="landing" 
      head={{title: 'Waysbucks | Coffee For Everytime'}}>
      <Hero />
      <Features />
      <Benefits />
    </Layout>
  )
};


export const getServerSideProps: GetServerSideProps<HomeProps> = async (ctx): Promise<GetServerSidePropsResult<HomeProps>> => {
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