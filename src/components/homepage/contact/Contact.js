import React from 'react';
import styles from './Contact.module.css';


const Contact = () => {
    return (
      <>
        <h2 className={styles.homepageHeadline} id="kontakt">
          Kontakt
        </h2>
        <div className={styles.contactContainer}>
          <p>
            <b>JIKONA STK, s.r.o.</b>
          </p>
          <p>
            <b>IČO:</b> 25150651
          </p>
          <p>
            <b>Email:</b> jikona@volny.cz
          </p>
          <p>
            <b>Adresa:</b> Hradištská 2439; 397 01 Písek
          </p>
          <div className={styles.contactPhone}>
            Máte jakýkoliv dotaz? Zavolejte nám!
            <br />
            <a href="tel:382 219 089" className="">
              382 219 089
            </a>
          </div>
        </div>
        <div className={styles.mapResponsive}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5361.845835925786!2d14.135019267864315!3d49.30301577515703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b4fed4b5707fb%3A0x3ec9a0d314d70521!2sSTK%20P%C3%ADsek%20-%20Jikona%20s.r.o.!5e0!3m2!1scs!2scz!4v1622981173212!5m2!1scs!2scz"
            width="600"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </>
    );
};

export default Contact;