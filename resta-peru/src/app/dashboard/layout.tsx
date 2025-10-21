// src/app/dashboard/layout.tsx
"use client"; // Convertimos a Client Component para usar hooks

import { useRouter } from "next/navigation";
import TitleBar from "@/componentsSections/TitleBar"; // Asegúrate que la ruta sea correcta
import styles from "@/styles/Layout.module.css";

// NOTA: La metadata se movió al page.tsx para mantener este layout como Client Component.

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Pasamos el botón como un "children" especial a TitleBar */}
      <TitleBar title="PANEL PRINCIPAL">       
      </TitleBar>
      <BackButton />
      <main className={styles.mainContent}>{children}</main>
    </>
  );
}

// Componente para el botón de salir/atrás
function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")} // Redirige a la página de selección de vendedor
      className="mr-4 rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
    >
      Salir
    </button>
  );
}