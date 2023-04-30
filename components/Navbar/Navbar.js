import Link from 'next/link';
import Image from 'next/image';
import hamburger from '/assets/hamburger.png';
import styles from './Navbar.module.scss';
import React from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav id={styles.nav}>
      <div id={styles.navWrapper}>
        <Link href='/'>
          <h3 id={styles.logo}>😎 TechBlog</h3>
        </Link>
        <div id={styles.navLinksWrapper}>
          <Link href='/'>Home</Link>
          <Link href='/blogs'>Browse</Link>
        </div>
        <div
          id={styles.hamburger}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Image width='30' height='30' alt='menu' src={hamburger} />
        </div>
        {isOpen && (
          <div
            id={styles.overlay}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        )}
        <div id={isOpen ? styles.menuActive : styles.menuHidden}>
          <div id={styles.navLinksWrapper}>
            <Link className={styles.navLink} href='/'>
              Home
            </Link>
            <Link className={styles.navLink} href='/blogs'>
              Browse
            </Link>
            <Link className={styles.navLink} href='/'>
              Latest
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
