// src/app/components/ui/PasswordModal.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/PasswordModal.module.css';
import NumericKeypad from './NumericKeypad';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  vendorName: string;
  vendorNumero: string;
}

const PasswordModal = ({ isOpen, onClose, onSubmit, vendorName, vendorNumero }: PasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [showKeypad, setShowKeypad] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

   // Efecto para auto-enviar la clave al llegar a 6 dígitos
   useEffect(() => {
    if (password.length === 6) {
      onSubmit(password);
      setPassword(''); // Limpia la contraseña después de enviar
    }
    console.log(password);
    
  }, [password, onSubmit]);

  // Efecto para enfocar el input cuando el modal se abre
  useEffect(() => {
    if (isOpen) {
      // Limpiamos la contraseña anterior
      setPassword("");
      // Enfocamos el input para que el usuario pueda escribir de inmediato
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);
  

  if (!isOpen) {
    return null;
  }

  const handleKeyPress = (key: string) => {
    //console.log(key);
    
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
    setShowKeypad(true);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Acceso: <span className='text-red-800 font-extrabold' >{vendorName.toUpperCase()} </span> [ <span className='text-green-800 font-extrabold' >{vendorNumero}</span> ]</h3>
        
        <div className={styles.inputContainer}>
          <input
            ref={inputRef}
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