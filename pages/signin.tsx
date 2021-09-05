import Link from 'next/link';
import Image from 'next/image';
import Logo from 'public/assets/icons/logo.svg';

import Layout from '@/components/layouts/signin';
import SigninForm from '@/components/moleculs/form/signin';

export default function Signin() {
  return (
    <Layout>
      <div className="mb-6">
        <Image alt="brand" src={Logo} width={80} height={80} />
      </div>
      <SigninForm />
      <p>Don&apos;t have an account yet? Please{' '}<Link href="/signup"><a className="text-blue-600">Sign up</a></Link></p>
    </Layout>
  )
}