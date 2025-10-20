// src/app/components/ui/PasswordModal.tsx
'use client';

import React, { useState } from 'react';
import styles from '@/styles/PasswordModal.module.css';
import NumericKeypad from './NumericKeypad';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  vendorName: string;
}

const PasswordModal = ({ isOpen, onClose, onSubmit, vendorName }: PasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleKeyPress = (key: string) => {
    if (password.length < 6) { // Limita la longitud de la contraseña
      setPassword(password + key);
    }
  };

  const handleBackspace = () => {
    setPassword(password.slice(0, -1));
  };

  const handleEnter = () => {
    onSubmit(password);
    setPassword(''); // Limpia la contraseña después de enviar
  };

  const handleClose = () => {
    setPassword('');
    setShowKeypad(false);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Clave para: {vendorName}</h3>
        
        <div className={styles.inputContainer}>
          <input
            type="password"
            value={password}
            readOnly // Para forzar el uso del teclado en pantalla
            className={styles.passwordInput}
            placeholder="●●●●●●"
          />
          <button onClick={() => setShowKeypad(!showKeypad)} className={styles.keypadToggle}>
            ⌨️
          </button>
        </div>

        {showKeypad && (
          <NumericKeypad
            onKeyPress={handleKeyPress}
            onBackspace={handleBackspace}
            onEnter={handleEnter}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordModal;