// src/app/components/ui/CurrentTime.tsx
'use client';

import { useState, useEffect } from 'react';

// Añadimos la prop 'width'
const CurrentTime = ({ width }: { width?: string | number }) => {
  // 1. Inicializamos el estado en null. No se renderizará en el servidor.
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // 2. Establecemos la hora inicial tan pronto como el componente se monta en el cliente.
    setTime(new Date());

    // 3. El intervalo sigue actualizando la hora cada segundo.
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

  // 4. Durante el renderizado del servidor y el primer renderizado del cliente, `time` es null.
  // Mostramos un placeholder o nada para evitar el mismatch.
  // Una vez que useEffect se ejecuta, el componente se vuelve a renderizar con la hora correcta.
  return (
    <span style={timeStyle}>{time ? time.toLocaleTimeString('es-PE') : '00:00:00'}</span>
  );
};

export default CurrentTime;
