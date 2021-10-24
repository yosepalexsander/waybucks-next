import Link from 'next/link';
import Image from 'next/image';
import Logo from 'public/assets/icons/logo.svg';

import Layout from '@/components/layouts/signup';
import SignupForm from '@/components/moleculs/form/signup';

export default function Signup() {
  return (
    <Layout>
      <div className="text-center mb-4">
        <Image alt="brand" src={Logo} width={80} height={80} />
        <p className="h3 text-gray-700">For Coffee Connoisseur</p>
      </div>
      <SignupForm />
      <p>Already have an account? {' '}<Link href="/signin"><a className="text-blue-600">Sign in</a></Link></p>
    </Layout>
  )
}