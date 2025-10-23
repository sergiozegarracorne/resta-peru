// src/app/dashboard/layout.tsx
"use client"; // Convertimos a Client Component para usar hooks

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TitleBar from "@/componentsSections/TitleBar"; // Asegúrate que la ruta sea correcta
import styles from "@/styles/Layout.module.css";



// NOTA: La metadata se movió al page.tsx para mantener este layout como Client Component.

export default function DashboardLayout({children,}: {  children: React.ReactNode;}) {
 
  return (
    <>
      {/* Pasamos el botón como un "children" especial a TitleBar */}           
      <main>{children}</main>
    </>
  );
}

