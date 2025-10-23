"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import SeccionesPager from "@/componentsSections/SeccionesPager"; 
import TitleBar from "@/componentsSections/TitleBar";
import sessionesData from "../secciones.json";



interface Vendor {
  numero: string;
  nombre: string;
  clave: string;
}

export default function VendorSelectionPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const router = useRouter(); // Inicializa el router

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setModalOpen(true);
  };



  // NOTA: El contenedor <main> ya tiene un padding horizontal de 10px
  // definido en `Layout.module.css` (.mainContent), por lo que no es necesario añadir más aquí.
  return (
    
    <main>
      <TitleBar title="SELECCIÓN DE PLATOS" />  
      <SeccionesPager elementos={sessionesData} columnas={6} filas={2} />     
    </main>
  );
}
