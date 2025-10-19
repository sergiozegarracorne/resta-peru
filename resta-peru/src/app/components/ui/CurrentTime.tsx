// src/app/components/ui/CurrentTime.tsx
'use client';

import { useState, useEffect } from 'react';

// Añadimos la prop 'width'
const CurrentTime = ({ width }: { width?: string | number }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  // Estilos para aplicar el ancho fijo
  const timeStyle: React.CSSProperties = {
    display: 'inline-block', // Necesario para que un <span> acepte 'width'
    width: width || 'auto',
    textAlign: 'center', // Puedes cambiarlo a 'right' o 'center'    
  };

  return <span style={timeStyle}>{time.toLocaleTimeString('es-PE')}</span>;
};

export default CurrentTime;
