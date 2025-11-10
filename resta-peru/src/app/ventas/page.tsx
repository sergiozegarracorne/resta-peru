"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import SeccionesPager from "@/componentsSections/SeccionesPager"; 
import ProductosPager from "@/componentsSections/ProductosPager";
import TitleBar from "@/componentsSections/TitleBar";
import MenuSidebar from "@/componentsSections/MenuSidebar"; // 1. Importamos el nuevo componente
import sessionesData from "../secciones.json";
import productosData from "../productos.json";



interface Seccion {
  id: number;
  numero:  string;
  nombre: string;  
  clave: string;
}

interface Producto {
  numero: string;
  nombre: string;
  seccion: string;
}

export default function VentasPage() {
  const [selectedSeccion, setSelectedSeccion] = useState<Seccion | null>(sessionesData[0] || null);
  const [menu, setMenu] = useState<Producto[]>([]);

  // Cargar el menú desde localStorage al iniciar
  useEffect(() => {
    actualizarMenu();
  }, []);

  // Función para leer localStorage y actualizar el estado del menú
  const actualizarMenu = () => {
    try {
      const menuGuardado = localStorage.getItem('menuActual');
      setMenu(menuGuardado ? JSON.parse(menuGuardado) : []);
    } catch (error) {
      console.error("Error al cargar el menú desde localStorage:", error);
      setMenu([]); // En caso de error, reseteamos el menú
    }
  };

  const handleSeccionClick = (seccion: Seccion) => {   
    setSelectedSeccion(seccion);
  };

  const productosFiltrados = useMemo(() => {
    if (!selectedSeccion) return [];
    return productosData.filter(p => p.seccion === selectedSeccion.numero);
  }, [selectedSeccion]);


  // NOTA: El contenedor <main> ya tiene un padding horizontal de 10px
  // definido en `Layout.module.css` (.mainContent), por lo que no es necesario añadir más aquí.
  return (
    // 1. Convertimos <main> en un contenedor flex vertical que ocupa toda la altura.
    <main className="flex flex-col h-full">
      <TitleBar title="SELECCIÓN DE PLATOS" />
      {/* 2. Este div ahora se expandirá para llenar el espacio restante. */}
      <div className="flex flex-1 overflow-hidden">
        {/* Contenedor para toda la columna izquierda */}
        <div className="w-4/12 flex flex-col border-4 border-red-600">
          {/* El contenedor del menú ahora tiene una base del 50% y no se encogerá */}
          <div className="basis-6/8 flex-shrink-0 min-h-0">
            <MenuSidebar menu={menu} />
          </div>
          {/* Este contenedor ocupará el espacio restante */}
          <div className="flex-1 bg-gray-300 p-4">AQUI VAN LAS OTRAS COSAS</div>
        </div>
        {/* Paginador de secciones (2/3 del ancho) */}
        <div className="w-8/12 pr-0 flex flex-col">
          <SeccionesPager elementos={sessionesData} columnas={6} filas={1} onSeccionClick={handleSeccionClick} />
          {/* Pasamos la función para actualizar el menú */}
          <ProductosPager elementos={productosFiltrados} columnas={6} filas={3} onProductoAgregado={actualizarMenu} />
        </div>
       
      </div>
    </main>
  );
}
