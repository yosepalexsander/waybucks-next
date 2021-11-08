import type { GetServerSideProps, GetServerSidePropsResult } from 'next';

import { User } from 'interfaces/object';
import { authSSR } from 'utils/auth';

import Layout from '@/components/layouts/app';
import Carts from '@/components/organism/cart/list';

type CartProps = {
  user: User | null
}

export default function CartPage({user}: CartProps) {
  return (
    <Layout
      head={{
        title: 'Cart | Waysbucks Coffee',
        description: 'Waysbucks user cart'
      }}
      user={user} route="cart"
    >
      <p className="h2 mb-5">My Cart</p>
      <Carts />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<CartProps> = async (ctx): Promise<GetServerSidePropsResult<CartProps>> => {
  const user = await authSSR(ctx)
  if (user) {
    return {
      props: {
        user: user
      }
    }
  }

  return {
    props: {
      user: null
    }
  }
}