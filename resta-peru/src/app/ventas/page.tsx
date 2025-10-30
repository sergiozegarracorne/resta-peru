"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import SeccionesPager from "@/componentsSections/SeccionesPager"; 
import ProductosPager from "@/componentsSections/ProductosPager";
import TitleBar from "@/componentsSections/TitleBar";
import sessionesData from "../secciones.json";
import productosData from "../productos.json";



interface Seccion {
  id: number
  numero:  string;
  nombre: string;  
  clave: string;
}

export default function VentasPage() {
  const [selectedSeccion, setSelectedSeccion] = useState<Seccion | null>(sessionesData[0] || null);

  const handleSeccionClick = (seccion: Seccion) => {
    console.log("Sección seleccionada:", seccion);
    
    setSelectedSeccion(seccion);
  };

  const productosFiltrados = useMemo(() => {
    if (!selectedSeccion) return [];
    return productosData.filter(p => p.seccion === selectedSeccion.numero.toString());
  }, [selectedSeccion]);


  // NOTA: El contenedor <main> ya tiene un padding horizontal de 10px
  // definido en `Layout.module.css` (.mainContent), por lo que no es necesario añadir más aquí.
  return (
    // 1. Convertimos <main> en un contenedor flex vertical que ocupa toda la altura.
    <main className="flex flex-col h-full">
      <TitleBar title="SELECCIÓN DE PLATOS" />
      {/* 2. Este div ahora se expandirá para llenar el espacio restante. */}
      <div className="flex flex-1">
         {/* Barra lateral para productos seleccionados (1/3 del ancho) */}
         <div className="w-3/12 bg-gray-100 p-4 border-l border-r-2 border-gray-400">
          <h4 className="text-lg font-bold border-b pb-2 mb-4 text-blue-950">Productos Seleccionados</h4>
          {/* Aquí irá la lista de productos */}
        </div>
        {/* Paginador de secciones (2/3 del ancho) */}
        <div className="w-9/12 pr-0 flex flex-col">
          <SeccionesPager elementos={sessionesData} columnas={6} filas={1} onSeccionClick={handleSeccionClick} />
          <ProductosPager elementos={productosFiltrados} columnas={6} filas={3} />
        </div>
       
      </div>
    </main>
  );
}
