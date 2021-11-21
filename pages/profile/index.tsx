import useSWRImmutable from 'swr/immutable';
import { useRouter } from 'next/router';

import { GetUserAddressResponse, GetUserResponse } from 'interfaces/api';
import { authCSR } from 'utils/auth';
import { getUserAddress } from 'utils/api';

import Layout from '@/components/layouts/app';
import DetailProfile from '@/components/organism/profile/detail';
import UserAddress from '@/components/organism/profile/userAddress';
import Loading from '@/components/atoms/loading';

export default function ProfilePage() {
  const router = useRouter()
  const {id} = router.query
  const {data, error} = useSWRImmutable<GetUserResponse | null, Error>(router.isReady ? `/users/${id}`: null, authCSR)
  const {data: address, error: addressError, mutate} = useSWRImmutable<GetUserAddressResponse, Error>(id ? `/address/${id}`: null, getUserAddress)

  if (!data && !error) {
    return <Loading />
  }
  return (
    <Layout
      head={{
        title: 'Profile | Waysbucks Coffee',
        description: 'Waysbucks user cart',
      }}
      user={data?.payload} route="cart"
    >
      <div className="profile-container">
        <DetailProfile user={data?.payload}/>
        <UserAddress mutator={mutate} address={address?.payload}/>
      </div>
    </Layout>
  )
}
