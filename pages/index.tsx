import { NextPageContext, GetServerSideProps, GetServerSidePropsResult } from 'next';
import Layout from '@/components/layouts/app';
import Hero from '@/components/organism/landing/hero';
import Benefits from '@/components/organism/landing/benefits';
import Features from '@/components/organism/landing/features';

import { User } from 'interfaces/object';
import cookies from 'next-cookies';
import { GetUserResponse } from 'interfaces/api';
import API, { createAxiosRequestConfig } from 'utils/api';

type HomeProps = {
  user: User | null
}

export default function Home({user}: HomeProps) {
  return (
    <Layout user={user}>
      <Hero />
      <Features />
      <Benefits />
    </Layout>
  )
};


export const getServerSideProps: GetServerSideProps<HomeProps> = async (ctx): Promise<GetServerSidePropsResult<HomeProps>> => {
  const { id } = cookies(ctx)
  const config = createAxiosRequestConfig({
    Cookie: ctx.req?.headers.cookie as string
  })
  const {data, ...response} = await API().getUser<GetUserResponse>(id, config)
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