import Head from 'next/head';
import { ReactElement } from 'react';
import Layout from '@/components/layouts/app';
import Header from '@/components/organism/header';
import Hero from '@/components/organism/landing/hero';
import Benefits from '@/components/organism/landing/benefits';
import Features from '@/components/organism/landing/features';
import Footer from '@/components/organism/footer';

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
      <Footer />
    </div>
  );
};
export default Home;
