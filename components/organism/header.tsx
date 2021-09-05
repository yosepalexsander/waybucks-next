import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from 'public/assets/icons/logo.svg';
import { MenuIcon } from 'icons';
import Drawer from '../moleculs/drawer';

export default function Header() {
  const [open, setOpen] = useState(false);

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
        <Link href="/signin">
          <a className="btn btn-primary-outline m-2">Sign in</a>
        </Link>
        <Link href="/signup">
          <a className="btn btn-primary m-2">Sign up</a>
        </Link>
      </div>
      <Drawer open={open} onClick={handleDrawer}>
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
        </ul>
        <Link href="/signin">
          <a className="btn btn-primary-outline m-2">Sign in</a>
        </Link>
        <Link href="/">
          <a className="btn btn-primary m-2">Sign up</a>
        </Link>
      </Drawer>
    </header>
  )
}
