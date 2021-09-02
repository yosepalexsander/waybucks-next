import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from 'public/assets/icons/logo.svg'
import { MenuIcon } from 'icons';
import Drawer from '../../moleculs/drawer';

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open)
  }
  return (
    <header className="app-bar">
      <Link href="/">
        <a className="app-bar-brand">
            <Image alt="brand" src={Logo} width={70} height={70} quality={65}/>
        </a>
      </Link>
      <button id="menuButton" className="btn btn-menu" 
      aria-label="open drawer" tabIndex={0} onClick={handleDrawer}>
        <span></span>
        <MenuIcon className="text-primary" width={48} height={48}/>
      </button>
      <ul className="app-bar-menu">
        <li>
          <Link href="/products">
            <a className="m-2">Products</a>
          </Link>
        </li>
        <li>
          <Link href="#store">
            <a className="m-2">Store</a>
          </Link>
        </li>
      </ul>
      <div className="app-bar-btn">
        <Link href="/signin">
          <a className="btn btn-primary-outline m-2">Sign in</a>
        </Link>
        <Link href="/">
          <a className="btn btn-primary m-2">Sign up</a>
        </Link>
      </div>
      <Drawer open={open} onClick={handleDrawer}>
        <div>Drawer</div>
      </Drawer>
    </header>
  )
}
