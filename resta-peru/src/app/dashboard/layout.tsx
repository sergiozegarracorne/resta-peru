// src/app/dashboard/layout.tsx
"use client"; // Convertimos a Client Component para usar hooks

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TitleBar from "@/componentsSections/TitleBar"; // Asegúrate que la ruta sea correcta
import styles from "@/styles/Layout.module.css";

interface Vendor {
  numero: string;
  nombre: string;
}

// NOTA: La metadata se movió al page.tsx para mantener este layout como Client Component.

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [vendor, setVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    // Leemos los datos del vendedor desde sessionStorage cuando el componente se monta en el cliente
    const vendorData = sessionStorage.getItem('currentVendor');
    if (vendorData) {
      setVendor(JSON.parse(vendorData));
    }
  }, []);

  return (
    <>
      {/* Pasamos el botón como un "children" especial a TitleBar */}
      <TitleBar title="Vendedor Actual: ">
        {vendor && (
            <span className="ml-2 font-bold text-white">
                {vendor.nombre.toUpperCase()} [{vendor.numero}]
            </span>
        )}
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