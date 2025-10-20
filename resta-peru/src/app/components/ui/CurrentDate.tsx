// src/components/CurrentDate.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import CalendarModal from './CalendarModal';

// Tipos para el valor del calendario
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CurrentDate = () => {
  // Inicializamos el estado en null para evitar renderizarlo en el servidor.
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());

  useEffect(() => {
    // Esta lógica ahora solo se ejecuta en el cliente.
    const updateDate = () => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      setCurrentDate(new Date().toLocaleDateString('es-PE', options));
    };
    updateDate();
  }, []);

  const handleDateChange = useCallback((value: Value) => {
    setSelectedDate(value);
    // Opcional: podrías hacer algo con la fecha seleccionada aquí
    console.log('Fecha seleccionada:', value);
    setModalOpen(false); // Cierra el modal al seleccionar una fecha
  }, []);

  return (
    <>
      <span onClick={() => setModalOpen(true)} className="cursor-pointer hover:text-gray-300 transition-colors">
        {currentDate || '...'}
      </span>
      <CalendarModal        
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </>
  );
};

export default CurrentDate;
