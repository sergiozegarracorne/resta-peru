// src/app/components/ui/NumericKeypad.tsx
'use client';

import React from 'react';
import styles from '@/styles/NumericKeypad.module.css';

interface NumericKeypadProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
}

const NumericKeypad = ({ onKeyPress, onBackspace, onEnter }: NumericKeypadProps) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'BORRAR', '0', 'ENTRAR'];

  const handleKeyClick = (key: string) => {
    if (key === 'BORRAR') {
      onBackspace();
    } else if (key === 'ENTRAR') {
      onEnter();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className={styles.keypadContainer}>
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => handleKeyClick(key)}
          className={`${styles.key} ${key === 'BORRAR' ? styles.keyDelete : ''} ${key === 'ENTRAR' ? styles.keyEnter : ''}`}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default NumericKeypad;