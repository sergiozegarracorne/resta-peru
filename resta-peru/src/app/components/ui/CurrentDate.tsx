// src/components/CurrentDate.tsx
'use client';

import { useState, useEffect } from 'react';

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    // Mostramos la fecha en un formato largo y amigable para Perú
    setCurrentDate(new Date().toLocaleDateString('es-PE', options));
  }, []);

  return <span>{currentDate}</span>;
};

export default CurrentDate;
