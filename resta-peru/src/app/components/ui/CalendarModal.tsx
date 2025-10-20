// src/app/components/ui/CalendarModal.tsx
'use client';

import React from 'react';
import Calendar from 'react-calendar';
import styles from '@/styles/CalendarModal.module.css';

// Definimos los tipos para las props del calendario
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: Value;
  onChange: (value: Value) => void;
}

const CalendarModal = ({ isOpen, onClose, value, onChange }: CalendarModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    // El overlay oscuro que cubre toda la pantalla
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* El contenedor del calendario, que evita que el clic se propague al overlay */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <Calendar onChange={onChange} value={value} locale="es-ES" />
      </div>
    </div>
  );
};

export default CalendarModal;