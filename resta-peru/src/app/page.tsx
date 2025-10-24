"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import VendedorBoton from "@/componentsUI/VendedorBoton";
import PasswordModal from "@/componentsUI/PasswordModal";
import vendorsData from "./vendors.json";
import TitleBar from "./components/sections/TitleBar";

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

  const handlePasswordSubmit = async (password: string) => {
    if (selectedVendor) {
      // Buscamos al vendedor en nuestros datos para obtener la clave correcta
      const vendorInData = vendorsData.find(v => v.numero === selectedVendor.numero);

      if (vendorInData && vendorInData.clave === password) {
        // ¡Redirección en caso de éxito!
        // 1. Guardamos los datos del vendedor en sessionStorage para usarlos en el dashboard
        sessionStorage.setItem('currentVendor', JSON.stringify(vendorInData));
        // 2. ¡IMPORTANTE! Creamos una cookie para que el middleware pueda verificar la sesión.
        //    El valor puede ser simple, solo para indicar que hay una sesión activa.
        document.cookie = "auth_token=true; path=/; max-age=86400"; // Cookie válida por 1 día
        router.push("/ventas");
      } else {
        alert("Clave incorrecta. Inténtalo de nuevo.");
      }
    }
    setModalOpen(false); // Cierra el modal después de enviar
  };

  // NOTA: El contenedor <main> ya tiene un padding horizontal de 10px
  // definido en `Layout.module.css` (.mainContent), por lo que no es necesario añadir más aquí.
  return (
    
    <main>
      <TitleBar title="SELECCIÓN DE VENDEDOR" />  
      {/* Usamos CSS Grid para 8 columnas. */}
      {/* Al eliminar 'justify-items-center', los botones se estirarán para ocupar todo el ancho de su columna. */}
      <div className="grid grid-cols-8 gap-1"> 
        {vendorsData.map((vendor) => (
          <VendedorBoton
            key={vendor.numero}
            numero={vendor.numero}
            nombre={vendor.nombre}
            onClick={() => handleVendorClick(vendor)}
          />
        ))}
      </div>

      {selectedVendor && (
        <PasswordModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handlePasswordSubmit}
          vendorName={selectedVendor.nombre}
          vendorNumero={selectedVendor.numero}
        />
      )}
    </main>
  );
}
