// src/app/dashboard/page.tsx
"use client";

import VendedorBoton from "@/componentsUI/VendedorBoton"; // Asegúrate que la ruta sea correcta
import TitleBar from "@/componentsSections/TitleBar";
import vendorsData from "./../vendors.json";


export default function DashboardPage() {
    return (
        <>
                      
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