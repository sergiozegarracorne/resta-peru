// components/ui/VendedorBoton.tsx
import React from "react";
import styles from '@/styles/VendedorBoton.module.css';

// Definimos las propiedades que nuestro componente recibirá.
// Heredamos todas las propiedades de un botón HTML estándar (`React.ButtonHTMLAttributes<HTMLButtonElement>`)
// y añadimos las nuestras (`numero` y `nombre`).
interface VendedorBotonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  numero: string;
  nombre: string;
}

const VendedorBoton = ({ numero, nombre, type = "button", ...props }: VendedorBotonProps) => {
  return (
    // Cambiamos el <div> por un <button> y le pasamos el `type` y el resto de props.
    <button  type={type} className={styles.container } {...props}>
      <div role="button" className={styles.numero }>{numero}</div>
      <div className={styles.nombre}>{nombre}</div>
    </button>
  );
};

export default VendedorBoton;  