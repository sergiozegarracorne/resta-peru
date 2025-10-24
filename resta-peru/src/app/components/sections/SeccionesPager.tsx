// SeccionesPager.tsx
"use client";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import SeccionBoton from "@/componentsUI/SeccionBoton";

type Elemento = { numero: string | number; nombre: string };
type PaginadorProps = {
  elementos: Elemento[];
  columnas?: number;    // columnas visibles
  filas?: number;       // filas visibles por página
  espaciado?: string;   // tailwind gap (e.g., "gap-1")
};

export default function SeccionesPager({ elementos, columnas = 6, filas = 2, espaciado = "gap-0" }: PaginadorProps) {
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
  const elementosGrid = [];
  elementosGrid.push(...elementosDePagina.map(elemento => ({ tipo: 'elemento', ...elemento })));

  console.log(elementosGrid);
  

  if (mostrarSiguiente) elementosGrid.push({ tipo: 'siguiente' });

 
  return (
    <div className="h-full w-full ">
      {/* Grilla paginada */}
      <div className={`grid  grid-cols-${columnas}  ${espaciado}  `}>
        {elementosGrid.map((elementoRow, indice) => {
        
          if (elementoRow.tipo === 'elemento') {
            return (
              <SeccionBoton
                key={elementoRow.tipo + indice}
                numero={ String(elementoRow.nombre)}
                nombre={elementoRow.nombre}
                onClick={() => {
                  /* tu handler */
                }}
              />
            );
          }

       
          if (elementoRow.tipo === 'siguiente') {
            return (
              <SeccionBoton key="siguiente" numero="▶" nombre="▶" onClick={irAPaginaSiguiente} />
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
                <SeccionBoton key="siguiente" numero="▶" nombre="▶" onClick={irAInicio} />
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
