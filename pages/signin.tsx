import Link from 'next/link';
import Image from 'next/image';
import Logo from 'public/assets/icons/logo.svg';
import img from 'public/assets/images/login.svg';

import Layout from '@/components/layouts/signin';
import SigninForm from '@/components/organism/form/signin';

export default function SigninPage() {
  return (
    <Layout>
      <section id="signin" className="auth">
        <div className="auth-img">
          <Image src={img} layout="responsive" width={100} height={100} 
            objectFit="cover" alt="coffee addict"/>
        </div>
        <div className="form-container">
          <div className="mb-6 text-center">
            <Image alt="waysbucks brand" src={Logo} width={80} height={80} />
            <h1 className="text-2xl font-medium">Welcome Back!</h1>
          </div>
          <SigninForm />
          <p className="text-center text-sm lg:text-base">Don&apos;t have an account yet? Please{' '}
            <Link href="/signup">
              <a className="text-blue-600">Sign up</a>
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  )
}