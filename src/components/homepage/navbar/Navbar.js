import React, {useState} from "react";
import styles from './Navbar.module.css';

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.navbar}>
      <div className={styles.navLogo}>
        <div className={styles.navSvg}></div>
        <div className={styles.navLogoText}>STK Písek</div>
      </div>
      <div className={`${styles.navItems} ${isOpen && styles.open}`}>
        <a
          className={styles.link}
          href="#prubeh-prohlidky"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Průběh prohlídky
        </a>
        <a
          className={styles.link}
          href="#oteviraci-doba"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Otevírací doba
        </a>
        <a
          className={styles.link}
          href="#kontakt"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Kontakty
        </a>
        <a className={styles.link} href="http://stkmilevsko.stkpisek.cz/">
          STK Milevsko
        </a>
        <a
          className={styles.navCtaButton}
          href="https://goo.gl/maps/kDHkBfYtVV8EqvqS6"
          rel="noopener noreferrer"
        >
          Navigovat na STK
        </a>
      </div>
      <div
        className={`${styles.navToggle} ${isOpen && styles.open}`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className={styles.bar}></div>
      </div>
    </div>
  );
};

export default Navbar;
