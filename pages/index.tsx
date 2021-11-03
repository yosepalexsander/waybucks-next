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

export default function Home({user}: HomeProps) {
  return (
    <Layout user={user} route="landing">
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