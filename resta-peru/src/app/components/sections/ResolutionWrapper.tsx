'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from '@/styles/Layout.module.css';

// Las resoluciones que quieres soportar. La primera es la base.
const BASE_WIDTH = 1024;
const BASE_HEIGHT = 768;

export default function ResolutionWrapper({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  const handleResize = useCallback(() => {
    const { innerWidth, innerHeight } = window;
    const scaleX = innerWidth / BASE_WIDTH;
    const scaleY = innerHeight / BASE_HEIGHT;
    
    // Escala manteniendo el aspect ratio para que quepa en la pantalla
    const newScale = Math.min(scaleX, scaleY);
    
    setScale(newScale);
  }, []);

  useEffect(() => {
    handleResize(); // Calcular al inicio
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const wrapperStyle = {
    transform: `scale(${scale})`,
  };

  return (
    <div className={styles.viewportContainer}>
      <div className={styles.fixedResolutionWrapper} style={wrapperStyle}>
        {children}
      </div>
    </div>
  );
}
