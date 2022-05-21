import React from 'react';
import styles from './Footer.module.css';




const Footer = () => {
    return (
      <div className={styles.footerContainer}>
        <a href="/login">Přihlásit se</a>
        <p>by Roman Jelínek</p>
      </div>
    );
};

export default Footer;