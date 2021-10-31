import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Logo from 'public/assets/icons/logo.svg';
import { MenuIcon } from 'icons';
import Drawer from '../moleculs/drawer';
import Dropdown from '../moleculs/dropdown';

import { User } from 'interfaces/object';
import Avatar from '../atoms/avatar';

type HeaderProps = {
  user: User | null
}
export default function Header({user}: HeaderProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDrawer = () => {
    setOpen(!open)
  }
  return (
    <header className="app-bar">
      <Link href="/">
        <a className="app-bar-brand">
          <Image alt="brand" src={Logo} width={60} height={60}/>
        </a>
      </Link>
      <button id="menuButton" className="btn-menu" 
        aria-label="open drawer" tabIndex={0} onClick={handleDrawer}>
        <span></span>
        <MenuIcon className="text-primary w-11 h-11"/>
      </button>
      <ul className="app-bar-menu">
        <li className="m-2">
          <Link href="/products">
            <a>MENU</a>
          </Link>
        </li>
        <li className="m-2">
          <Link href="/about">
            <a>ABOUT US</a>
          </Link>
        </li>
      </ul>
      <div className="app-bar-btn">
        {user ? (
          <div>
            <Avatar 
              id="dropdown-button" 
              alt="avatar"
              aria-controls="dropdown-menu"
              aria-haspopup="true"
              src={user.image}
              aria-expanded={openDropdown ? 'true' : undefined} 
              width={50}
              height={50}
              onClick={() => setOpenDropdown(true)}
            >{user.name.match(/\b(\w)/g)?.join('').toUpperCase()}</Avatar>
            <Dropdown 
              id="dropdown-menu" 
              aria-labelledby="dropdown-button" 
              userId={user.id} 
              open={openDropdown} 
              handleClose={() =>   setOpenDropdown(false)}
            />
          </div>
        ) : (
          <>
            <Link href="/signin">
              <a className="btn btn-primary-outline m-2">Sign in</a>
            </Link>
            <Link href="/signup">
              <a className="btn btn-primary m-2">Sign up</a>
            </Link>
          </>
        )}
      </div>
      <Drawer open={open} onClick={handleDrawer}>
        {user ? (
          <></>
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
