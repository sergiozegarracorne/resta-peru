// components/VendedorBoton.jsx

import React from 'react';
import styles from '@/styles/VendedorBoton.module.css';

const VendedorBoton = ({ numero, nombre, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.numero}>{numero}</div>
      <div className={styles.nombre}>
        {nombre}
      </div>
    </div>
  );
};

export default VendedorBoton;