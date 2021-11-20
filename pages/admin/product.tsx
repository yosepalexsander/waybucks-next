import { useState } from 'react';
import cookies from 'next-cookies';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';

import Layout from '@/components/layouts/app';
import Tabs from '@/components/atoms/tabs/tabs';
import Tab from '@/components/atoms/tabs/tab';
import TabPanel from '@/components/atoms/tabs/tabpanel';
import TableProduct from '@/components/organism/table/products';
import TableTopping from '@/components/organism/table/toppings';

import { createAxiosRequestConfig, getUser } from 'utils/api';
import { GetUserResponse } from 'interfaces/api';
import { User } from 'interfaces/object';

function a11yPropsTab(index: number) {
  return {
    id: `products-tab-${index}`,
    'aria-controls': `products-tabpanel-${index}`,
  };
}
function a11yPropsTabPanel(index: number) {
  return {
    id: `products-tab-${index}`,
    'aria-labelledby': `products-tabpanel-${index}`,
  };
}

type AdminProductProps = {
  user: User | null
}
export default function ProductPage({user}: AdminProductProps) {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout
      head={{
        title: 'Admin Product | Waysbucks Coffee',
        description: 'Waysbucks admin product'
      }}
      user={user} route="admin/product"
    >
      <div className="w-full flex flex-container flex-col lg:flex-row">
        <Tabs value={value} onChange={handleChange} className="flex-item" aria-label="admin products tabs">
          <Tab label="Products" {...a11yPropsTab(0)} />
          <Tab label="Toppings" {...a11yPropsTab(1)} />
        </Tabs>
        <TabPanel value={value} index={0} className={value === 0 ? 'flex-item flex-auto': ''} {...a11yPropsTabPanel(0)}>
          <TableProduct/>
        </TabPanel>
        <TabPanel value={value} index={1} className={value === 1 ? 'flex-item flex-auto': ''} {...a11yPropsTabPanel(0)}>
          <TableTopping/>
        </TabPanel>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<AdminProductProps> = async (ctx): Promise<GetServerSidePropsResult<AdminProductProps>> => {
  const { id, token } = cookies(ctx)
  const config = createAxiosRequestConfig({
    Authorization: `Bearer ${token}`
  })
  
  if (id && token) {
    const data = await getUser<GetUserResponse>(id, config)
    if (data.payload && data.payload.is_admin) {
      return {
        props: {
          user: data.payload
        }
      }
    }
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}