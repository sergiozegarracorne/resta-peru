"use client";

interface Producto {
  numero: string;
  nombre: string;
  seccion: string;
}

interface MenuSidebarProps {
  menu: Producto[];
}

export default function MenuSidebar({ menu }: MenuSidebarProps) {
  return (
    <div className="bg-gray-100 py-4 px-2 border-l border-r-2 border-gray-400 flex flex-col h-full min-h-0">
      <h4 className="text-md font-bold border-b pb-2 mb-2 text-blue-950 flex-shrink-0">
        Productos Seleccionados
      </h4>
      <ul className="space-y-2 flex-1 overflow-y-auto px-1">
        {menu.map((producto, index) => (
          <li key={index} className="flex justify-between items-center bg-white p-2 rounded shadow">
            <span className="text-xs">{producto.nombre.toLocaleUpperCase()}</span>
            <span className="font-semibold text-xs">S/ {producto.numero}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}