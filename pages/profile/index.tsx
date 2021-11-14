import useSWRImmutable from 'swr/immutable';

import { GetUserAddressResponse, GetUserResponse } from 'interfaces/api';
import { authCSR } from 'utils/auth';
import { getUserAddress } from 'utils/api';

import Layout from '@/components/layouts/app';
import DetailProfile from '@/components/organism/profile/detail';
import UserAddress from '@/components/organism/profile/userAddress';
import Loading from '@/components/atoms/loading';

export default function ProfilePage() {
  const {data, error} = useSWRImmutable<GetUserResponse | null, Error>('/users', authCSR)
  const {data: address, error: addressError} = useSWRImmutable<GetUserAddressResponse | null, Error>('/address', getUserAddress)
  
  if (!data?.payload && !error) {
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
      <div className="flex flex-col items-center lg:flex-row md:justify-around md:items-start">
        <DetailProfile user={data?.payload}/>
        <UserAddress address={address?.payload}/>
      </div>
    </Layout>
  )
}
