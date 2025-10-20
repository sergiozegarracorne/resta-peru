// src/components/CustomCursor.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';



const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Función para mover el cursor
  const onMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
    setPosition({ x: clientX, y: clientY });
  }, []);

  // Función para detectar si el cursor está sobre un elemento interactivo
  const onMouseOver = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.role === 'button' ||
      target.classList.contains('cursor-pointer')
    ) {
      setIsPointer(true);
    } else {
      setIsPointer(false);
    }

  }, []);

  // Función para ocultar el cursor cuando sale de la ventana
  const onMouseEnterViewport = useCallback(() => setIsVisible(true), []);
  const onMouseLeaveViewport = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    // Añadir los event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseenter', onMouseEnterViewport);
    document.addEventListener('mouseleave', onMouseLeaveViewport);

    // Limpiar los event listeners al desmontar el componente
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseenter', onMouseEnterViewport);
      document.removeEventListener('mouseleave', onMouseLeaveViewport);
    };
  }, [onMouseMove, onMouseOver, onMouseEnterViewport, onMouseLeaveViewport]);

  // No renderizar nada en dispositivos táctiles
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
   
      {/* Nuestro cursor falso */}
      <div
        className={`fixed z-50 pointer-events-none transition-transform duration-75 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-25%, -5%)', // Centra el div en el puntero
        }}
      >
        <img
          // Las rutas a archivos en la carpeta `public` siempre empiezan con "/"
          // Asumimos que tienes 'pointer.png' para la mano y 'default.png' para la flecha.
          src={isPointer ? '/cursor/pointer.png' : '/cursor/default.png'}
          alt="Cursor personalizado"
          // He ajustado el tamaño para que sea más manejable, ¡cámbialo a tu gusto!
          className="w-12 h-12"
        />
      </div>
    </>
  );
};

export default CustomCursor;