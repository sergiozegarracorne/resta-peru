// ProductosPager.tsx
"use client";
import { useMemo, useState, useCallback, useEffect } from "react";
import SeccionBoton from "@/componentsUI/SeccionBoton";

// Tipos específicos para productos
type Producto = { 
  numero: string;  
  nombre: string; 
  seccion: string;
};

type PaginadorProps = {
  elementos: Producto[];
  columnas?: number;
  filas?: number;
  espaciado?: string;
};

// Mapeo de columnas para Tailwind
const gridColsMap: { [key: number]: string } = {
  1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3",
  4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6",
  7: "grid-cols-7", 8: "grid-cols-8", 9: "grid-cols-9",
  10: "grid-cols-10", 11: "grid-cols-11", 12: "grid-cols-12",
};

export default function ProductosPager({ elementos, columnas = 6, filas = 3, espaciado = "gap-1" }: PaginadorProps) {
  const elementosPorPagina = columnas * filas;
  const espaciosPorPagina = elementosPorPagina;
  
  // Reservamos 1 espacio para el botón de "Siguiente" o "Inicio"
  const elementosRealesPorPagina = Math.max(1, espaciosPorPagina - 1);

  const paginasTotales = Math.max(1, Math.ceil(elementos.length / elementosRealesPorPagina));
  const [pagina, setPagina] = useState(0);

  // Reiniciar a la página 0 cuando los elementos cambian
  useEffect(() => {
    setPagina(0);
  }, [elementos]);

  const elementosDePagina = useMemo(() => {
    const inicio = pagina * elementosRealesPorPagina;
    const fin = inicio + elementosRealesPorPagina;
    return elementos.slice(inicio, fin);
  }, [elementos, pagina, elementosRealesPorPagina]);

  const irAPaginaSiguiente = useCallback(() => setPagina(p => Math.min(paginasTotales - 1, p + 1)), [paginasTotales]);
  const irAInicio = useCallback(() => setPagina(0), []);

  const mostrarSiguiente = pagina < paginasTotales - 1;

  const gridClassName = `grid ${gridColsMap[columnas] || 'grid-cols-6'} ${espaciado} p-1 h-full`;

  return (
    <div className="h-full w-full">
      <div className={gridClassName}>

        {elementosDePagina.map((producto) => (                   
          <SeccionBoton          
            key={producto.numero}
            // Formateamos el precio para que se vea bien
            numero={`S/ ${producto.numero}`}
            nombre={producto.nombre}
            onClick={() => {
              console.log("Producto seleccionado:", producto);
              // Aquí irá la lógica para añadir el producto a la lista
            }}
          />
        ))}
        
        {/* Relleno para mantener la rejilla consistente */}
        {Array.from({ length: espaciosPorPagina - elementosDePagina.length -1 }).map((_, i) => (
          <div key={`placeholder-${i}`} />
        ))}

        {/* Botón de navegación siempre al final */}
        {paginasTotales > 1 && (
            mostrarSiguiente ? (
                <SeccionBoton key="siguiente" numero="▶" nombre="Siguiente" onClick={irAPaginaSiguiente} />
            ) : (
                <SeccionBoton key="inicio" numero="↩" nombre="Inicio" onClick={irAInicio} />
            )
        )}
      </div>
    </div>
  );
}
