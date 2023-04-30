import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p id={styles.footerDescription}>
          © 2023 by My Blog. Proudly created with love.
        </p>
        <ul id={styles.footerLinksWrapper}>
          <li className={styles.footerLinks}>
            <a className={styles.footerAnchors} href='#'>
              About
            </a>
          </li>
          <li className={styles.footerLinks}>
            <a className={styles.footerAnchors} href='#'>
              Contact
            </a>
          </li>
          <li className={styles.footerLinks}>
            <a className={styles.footerAnchors} href='#'>
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
