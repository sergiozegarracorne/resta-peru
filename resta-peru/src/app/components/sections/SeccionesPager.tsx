// SeccionesPager.tsx
"use client";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import SeccionBoton from "@/componentsUI/SeccionBoton";

type Elemento = { id: number, numero: string ; nombre: string; clave: string};
type PaginadorProps = {
  elementos: Elemento[];
  columnas?: number;    // columnas visibles
  filas?: number;       // filas visibles por página
  espaciado?: string;   // tailwind gap (e.g., "gap-1")
  onSeccionClick: (seccion: Elemento) => void; // Callback para notificar el clic
};

// Definimos los tipos de objetos que pueden ir en la grilla
type ElementoGrid = 
  | ({ tipo: 'elemento' } & Elemento)
  | { tipo: 'siguiente' }
  | { tipo: 'vacio' };

  const gridColsMap: { [key: number]: string } = {
    1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3",
    4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-6",
    7: "grid-cols-7", 8: "grid-cols-8", 9: "grid-cols-9",
    10: "grid-cols-10", 11: "grid-cols-11", 12: "grid-cols-12",
  };

  // Paleta de colores de fondo para los botones
  const backgroundColors = [
    '#fecaca', // red-200
    '#fed7aa', // orange-200
    '#fef08a', // yellow-200
    '#bbf7d0', // green-200
    '#a5f3fc', // cyan-200
    '#bfdbfe', // blue-200
    '#e9d5ff', // purple-200
    '#fbcfe8', // pink-200
  ];
export default function SeccionesPager({ elementos, columnas = 6, filas = 2, espaciado = "gap-0", onSeccionClick }: PaginadorProps) {
  const router = useRouter();
  const elementosPorPagina = columnas * filas;
  
  // Calculamos cuántos items reales mostraremos por página, reservando espacios para los botones de navegación.
  const espaciosPorPagina = elementosPorPagina;
  const botonesNavPorPagina = 1; // 1 para Anterior, 1 para Siguiente
  const elementosPorPaginaCompleta = espaciosPorPagina - botonesNavPorPagina;

  const paginasTotales = Math.max(1, Math.ceil(elementos.length / elementosPorPaginaCompleta));
  const [pagina, setPagina] = useState(0);

  const elementosDePagina = useMemo(
    () => {
      const inicio = pagina * elementosPorPaginaCompleta;
      const fin = inicio + elementosPorPaginaCompleta;
      return elementos.slice(inicio, fin);
    },
    [elementos, pagina, elementosPorPaginaCompleta]
  );

  const irAPaginaAnterior = useCallback(() => setPagina(p => Math.max(0, p - 1)), []);
  const irAPaginaSiguiente = useCallback(() => setPagina(p => Math.min(paginasTotales - 1, p + 1)), [paginasTotales]);
  const irAInicio = useCallback(() => setPagina(p => Math.max(0,0)), []);

  // Determinamos qué botones de navegación mostrar

  const mostrarSiguiente = pagina < paginasTotales - 1;

  // Calculamos cuántos items se mostrarán en la página actual
  let conteoElementosActual = elementosDePagina.length;

  if (mostrarSiguiente) conteoElementosActual++;

  // Creamos la lista de elementos a renderizar, incluyendo botones de navegación
  const elementosGrid: ElementoGrid[] = [];
  elementosGrid.push(...elementosDePagina.map(elemento => ({ tipo: 'elemento' as const, ...elemento })));

  //console.log(elementosDePagina);
  

  if (mostrarSiguiente) elementosGrid.push({ tipo: 'siguiente' });
   // Construimos la clase de la grilla de forma segura para Tailwind
   const gridClassName = `grid ${gridColsMap[columnas] || 'grid-cols-6'} ${espaciado}  bg-gray-100 border-b-2 border-gray-200 p-1`;

 
  return (
    <div className="w-full   ">
      {/* Grilla paginada */}
      <div className={gridClassName}>
        {elementosGrid.map((elementoRow, indice) => {        
          if (elementoRow.tipo === 'elemento') {
            return (
              <SeccionBoton
                key={elementoRow.tipo + indice}
                numero={ String(elementoRow.nombre)}
                style={{ backgroundColor: backgroundColors[indice % backgroundColors.length] }}
                nombre={elementoRow.nombre}
                onClick={() => onSeccionClick(elementoRow)}
              />
            );
          }

       
          if (elementoRow.tipo === 'siguiente') {
            return (
              <SeccionBoton key="siguiente" numero="▶" nombre="▶▶" onClick={irAPaginaSiguiente} />
            );
          } 
          return null;
        })}
        
        {/* Relleno para mantener rejilla completa */}
        {Array.from({ length: espaciosPorPagina - elementosGrid.length }).map((_, i) => {
            console.log(i);
            
          // En la última página, si este es el último espacio vacío, se convierte en el botón "Volver".
          if (!mostrarSiguiente && i === espaciosPorPagina - elementosGrid.length - 1) {
            return (
                <SeccionBoton key="siguiente" numero="▶" nombre="▶▶▶" onClick={irAInicio} />
              );
          }
          return (
            <SeccionBoton key={`empty-${i}`} numero="X" nombre="x" onClick={irAPaginaSiguiente} />
          );
        })}
      </div>
    </div>
  );
}
