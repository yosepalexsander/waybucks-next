import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';

import { authCSR } from 'utils/auth';
import { GetUserResponse } from 'interfaces/api';

import Layout from '@/components/layouts/app';
import Carts from '@/components/organism/cart/root';
import Loading from '@/components/atoms/loading';


export default function CartPage() {
  const router = useRouter()
  const {userId} =router.query
  const {data, error} = useSWRImmutable<GetUserResponse | null, Error>(router.isReady ? `/users/${userId}`: null, authCSR)
  
  if (!data && !error) return <Loading />
  return (
    <Layout
      head={{
        title: 'Cart | Waysbucks Coffee',
        description: 'Waysbucks user cart',
        extScript:<script async type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} />
      }}
      user={data?.payload} route="cart"
    >
      <p className="h2 mb-5">My Cart</p>
      <Carts user={data?.payload}/>
    </Layout>
  );
}