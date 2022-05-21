import React from 'react';
import styles from './Icons.module.css';

const icons = [
  { icon: 'car', description: 'Osobní do 3,5t', url:'/img/car-icon.svg'},
  { icon: 'van', description: 'Nákladní do 3,5t', url: '/img/van-icon.svg' },
  { icon: 'motorbike', description: 'Motocykly', url: '/img/trailer-icon.svg'},
  { icon: 'trailer', description: 'Přívěsy', url: '/img/motorbike-icon.svg'},
];

const Icnos = () => {
  return (
    <div className={styles.iconsContainer}>
      {icons.map((icon) => {
        return (
          <React.Fragment key={icon.icon}>
            <div
              className={styles.icons}
              style={{ backgroundImage: `url(${icon.url})` }}
            >
              <div className={styles.textBellowIcons}>{icon.description}</div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Icnos;
