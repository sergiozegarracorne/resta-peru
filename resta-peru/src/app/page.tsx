"use client";
import VendedorBoton from "@/componentsUI/VendedorBoton";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-0">      
      <div className="flex flex-wrap justify-start gap-2 pt-2">
        <VendedorBoton numero="1" nombre="Juan" onClick={() => console.log('Vendedor 1')} />
        <VendedorBoton numero="2" nombre="Ana" onClick={() => console.log('Vendedor 2')} />
        <VendedorBoton numero="3" nombre="Pedro" onClick={() => console.log('Vendedor 3')} />
        <VendedorBoton numero="4" nombre="Maria" onClick={() => console.log('Vendedor 4')} />
        <VendedorBoton numero="5" nombre="Luis" onClick={() => console.log('Vendedor 5')} />
        <VendedorBoton numero="6" nombre="Sofia" onClick={() => console.log('Vendedor 6')} />
        <VendedorBoton numero="7" nombre="Carlos" onClick={() => console.log('Vendedor 7')} />
        <VendedorBoton numero="8" nombre="Laura" onClick={() => console.log('Vendedor 8')} />
      </div>
    </main>
  );
}