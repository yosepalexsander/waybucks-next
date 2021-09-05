import Layout from '@/components/layouts/app';
import Hero from '@/components/organism/landing/hero';
import Benefits from '@/components/organism/landing/benefits';
import Features from '@/components/organism/landing/features';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Benefits />
    </Layout>
  )
};