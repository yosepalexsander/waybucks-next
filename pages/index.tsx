import Head from 'next/head';
import { ReactElement } from 'react';
import Layout from '@/components/layouts/app';
import Hero from '@/components/organism/landing/hero';
import Header from '@/components/organism/landing/header';
import Benefits from '@/components/organism/landing/benefits';
import Features from '@/components/organism/landing/features';

const Home = () => (
  <>
    <Hero />
    <Features />
    <Benefits />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>
      <Head>
        <title>Waysbucks: Coffee For Everytime</title>
      </Head>
      <Header />
      <Layout>
          {page}
      </Layout>
    </div>
  );
};
export default Home;
