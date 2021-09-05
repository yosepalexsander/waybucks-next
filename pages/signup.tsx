import Link from 'next/link';
import Image from 'next/image';
import Logo from 'public/assets/icons/logo.svg';

import Layout from '@/components/layouts/signup';
import SignupForm from '@/components/moleculs/form/signup';

export default function Signup() {
  return (
    <Layout>
      <div className="mb-6">
        <Image alt="brand" src={Logo} width={80} height={80} />
      </div>
      <SignupForm />
      <p>Already have an account? {' '}<Link href="/signin"><a className="text-blue-600">Sign in</a></Link></p>
    </Layout>
  )
}
