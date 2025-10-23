// src/app/dashboard/page.tsx
"use client"; 
import VendedorBoton from "@/componentsUI/VendedorBoton"; // Asegúrate que la ruta sea correcta

import TitleBar from "@/componentsSections/TitleBar";
import vendorsData from "./../vendors.json";
import { useEffect, useState } from "react";

interface Vendor {
    numero: string;
    nombre: string;
  }


export default function DashboardPage() {
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
            {/* Mostramos el nombre del vendedor o un texto provisional */}
            <TitleBar title={`Vendedor: ${vendor ? vendor.nombre : '...'}`} />            
            <div className="h-full w-full">
                <div className="grid grid-cols-8 gap-1">
                    {vendorsData.map((vendor) => (
                        <VendedorBoton
                            key={vendor.numero}
                            numero={vendor.numero}
                            nombre={vendor.nombre}
                            onClick={() => console.log(':-)')}
                        />
                    ))}
                </div>
            </div>
        </>
    );


}
