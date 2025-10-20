'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from '@/styles/Layout.module.css';

// Las resoluciones que quieres soportar. La primera es la base.
const BASE_WIDTH = 1024;
const BASE_HEIGHT = 700;

interface ResolutionWrapperProps {
  children: React.ReactNode;
  
}

export default function ResolutionWrapper({ children }: ResolutionWrapperProps) {


  return (    
      <div className={styles.fixedResolutionWrapper} >
        {children}
      </div>    
  );
}
