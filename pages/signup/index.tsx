import Link from 'next/link';
import Image from 'next/image';
import Logo from 'public/assets/icons/logo.svg';
import img from 'public/assets/images/login.svg';

import Layout from '@/components/layouts/signup';
import SignupForm from '@/components/organism/form/signup';

export default function SignupPage() {
  return (
    <Layout>
      <section id="signup" className="auth">
        <div className="auth-img">
          <Image src={img} layout="responsive" width={100} height={100} 
            objectFit="cover" alt="coffee addict" priority/>
        </div>
        <div className="form-container">
          <div className="mb-6 text-center">
            <Image alt="waysbucks brand" src={Logo} width={80} height={80} />
            <h1 className="text-2xl font-medium">For Coffee Connoisseur</h1>
          </div>
          <SignupForm />
          <p className="text-center text-sm lg:text-base">Already have an account? {' '}
            <Link href="/signin">
              <a className="text-blue-600">Sign in</a>
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  )
}