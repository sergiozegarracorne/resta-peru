// src/componentsUI/PasswordModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import styles from "@/styles/PasswordModal.module.css";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  vendorName: string;
  vendorNumero: string;
}

const PasswordModal = ({
  isOpen,
  onClose,
  onSubmit,
  vendorName,
  vendorNumero,
}: PasswordModalProps) => {
  const [password, setPassword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Efecto para auto-enviar la clave al llegar a 6 dígitos
  useEffect(() => {
    if (password.length === 6) {
      onSubmit(password);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Solo permitimos números y un máximo de 6 dígitos
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPassword(value);
    }
  };

  // Prevenimos el envío tradicional del formulario, ya que se hace con useEffect
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0 && password.length < 6) {
        // Opcional: permitir envío manual si no se completan los 6 dígitos
        onSubmit(password);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>
          Vendedor: {vendorNumero} - {vendorName}
        </h2>
        <p className={styles.subtitle}>Ingrese su clave de 6 dígitos</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password" // Usamos 'password' para ocultar los dígitos
            value={password}
            onChange={handleInputChange}
            maxLength={6}
            className={styles.passwordInput}
            autoComplete="off"
          />
          {/* El botón es opcional, ya que el envío es automático, 
              pero es bueno tenerlo por accesibilidad o si el usuario se equivoca. */}
          <div className={styles.buttonContainer}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;