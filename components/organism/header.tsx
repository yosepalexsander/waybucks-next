import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

import { User } from 'interfaces/object';
import { GetCartsResponse } from 'interfaces/api';
import { getCarts } from 'utils/api';
import { authLogout } from 'utils/auth';

import Drawer from '@/components/moleculs/drawer';
import Dropdown from '@/components/moleculs/dropdown';
import Avatar from '@/components/atoms/avatar';
import Badge from '@/components/atoms/badge';

import Logo from 'public/assets/icons/logo.svg';
import { AccountIcon, CartIcon, LogoutIcon, MenuIcon } from 'icons';
import MenuList from '../atoms/menu/menuList';
import MenuItem from '../atoms/menu/menuItem';



type HeaderProps = {
  user: User | null | undefined,
}
export default function Header({user}: HeaderProps) {
  //get user carts, first parameter is not used in request
  const {data: cartData, error} = useSWR<GetCartsResponse, Record<string, any>>(user ? '/carts': null, getCarts, {
    revalidateOnFocus: false,
    onErrorRetry: (error) => {
      if (error?.status === 404) return
    }
  })

  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)

  const handleDrawer = () => {
    setOpen(!open)
  }
  return (
    <header className="app-bar">
      <Link href="/">
        <a className="app-bar-brand">
          <Image alt="brand" src={Logo} layout="fill"/>
        </a>
      </Link>
      <button id="menuButton" className="btn-menu" 
        aria-label="open drawer" tabIndex={0} onClick={handleDrawer}>
        <span></span>
        <MenuIcon className="text-primary w-9 h-9"/>
      </button>
      <nav className="app-bar-menu">
        <Link href="/product">
          <a className="mx-2">MENU</a>
        </Link>
        <Link href="/about">
          <a className="mx-2">ABOUT US</a>
        </Link>
      </nav>
      <div className="app-bar-btn">
        {user ? (
          <>
            <Link href="/cart">
              <a>
                <Badge badgeContent={cartData?.payload?.length} color="secondary">
                  <CartIcon size={24}/>
                </Badge>
              </a>
            </Link>
            <div>
              <Avatar 
                id="dropdown-button" 
                alt="avatar"
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                src={user.image}
                aria-expanded={openDropdown ? 'true' : undefined} 
                width={45}
                height={45}
                onClick={() => setOpenDropdown(true)}
              >{user.name.match(/\b(\w)/g)?.join('').toUpperCase()}</Avatar>
              <Dropdown 
                id="dropdown-menu" 
                aria-labelledby="dropdown-button" 
                userId={user.id} 
                open={openDropdown} 
                handleClose={() =>   setOpenDropdown(false)}
                onClick={authLogout}
              />
            </div>
          </>
        ) : (
          <>
            <Link href="/signin">
              <a className="btn btn-primary-outline mx-2">Sign in</a>
            </Link>
            <Link href="/signup">
              <a className="btn btn-primary ml-2">Sign up</a>
            </Link>
          </>
        )}
      </div>
      <Drawer open={open} onClick={handleDrawer}>
        {user ? (
          <>
            <MenuList>
              <div className="flex flex-col items-center justify-center px-2 py-4">
                <Avatar 
                  id="dropdown-button" 
                  alt="avatar"
                  aria-controls="dropdown-menu"
                  aria-haspopup="true"
                  src={user.image}
                  aria-expanded={openDropdown ? 'true' : undefined} 
                  width={65}
                  height={65}
                  onClick={() => setOpenDropdown(true)}
              
                >{user.name.match(/\b(\w)/g)?.join('').toUpperCase()}</Avatar>
                <p className="h3 ml-3">{user.name}</p>
              </div>
              <MenuItem>
                <Link href={`/profile/${user.id}`}>
                  <a>
                    <div>
                      <AccountIcon size={24} className="text-primary"/>
                    </div>
                    <span>Account</span>
                  </a>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/cart">
                  <a>
                    <div>
                      <Badge badgeContent={cartData?.payload?.length} color="secondary">
                        <CartIcon size={24}/>
                      </Badge>
                    </div>
                    <span>Cart</span> 
                  </a>
                </Link>
              </MenuItem>
              <MenuItem>
                <div>
                  <LogoutIcon size={24} className="text-primary"/>
                </div>
                <a onClick={authLogout}>Logout</a>
              </MenuItem>
            </MenuList>
          </>
        ): (
          <>
            <ul className="my-4">
              <li className="mt-4 mx-2">
                <Link href="/products">
                  <a>Products</a>
                </Link>
              </li>
              <li className="mt-4 mx-2">
                <Link href="#store">
                  <a>Store</a>
                </Link>
              </li>
            </ul><Link href="/signin">
              <a className="btn btn-primary-outline m-2">Sign in</a>
            </Link><Link href="/signup">
              <a className="btn btn-primary m-2">Sign up</a>
            </Link>
          </>
        )}
      </Drawer>
    </header>
  )
}
