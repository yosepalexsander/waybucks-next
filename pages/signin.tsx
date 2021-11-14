import Link from 'next/link';
import Image from 'next/image';
import Logo from 'public/assets/icons/logo.svg';

import Layout from '@/components/layouts/signin';
import SigninForm from '@/components/organism/form/signin';

export default function SigninPage() {
  return (
    <Layout>
      <div className="mb-6 text-center">
        <Image alt="brand" src={Logo} width={80} height={80} />
        <p className="h3 text-gray-700">For Coffee Connoisseur</p>
      </div>
      <SigninForm />
      <p>Don&apos;t have an account yet? Please{' '}<Link href="/signup"><a className="text-blue-600">Sign up</a></Link></p>
    </Layout>
  )
}