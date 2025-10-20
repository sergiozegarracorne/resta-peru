"use client";
import { useState } from "react";
import VendedorBoton from "@/componentsUI/VendedorBoton";
import PasswordModal from "@/componentsUI/PasswordModal";

interface Vendor {
  numero: string;
  nombre: string;
}

export default function AboutPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setModalOpen(true);
  };

  const handlePasswordSubmit = (password: string) => {
    console.log(`Vendedor: ${selectedVendor?.nombre}, Clave: ${password}`);
    // Aquí iría la lógica para validar la contraseña
    setModalOpen(false); // Cierra el modal después de enviar
  };

  // NOTA: El contenedor <main> ya tiene un padding horizontal de 10px
  // definido en `Layout.module.css` (.mainContent), por lo que no es necesario añadir más aquí.
  return (
    <main>
      {/* Usamos CSS Grid para forzar 5 columnas. `grid-cols-5` crea 5 columnas de igual ancho. */}
      {/* Al eliminar 'justify-items-center', los botones se estirarán para ocupar todo el ancho de su columna. */}
      <div className="grid grid-cols-8 gap-1"> 
        <VendedorBoton
          numero="1"
          nombre="Juan"
          onClick={() => handleVendorClick({ numero: "1", nombre: "Juan" })}
        />
        <VendedorBoton
          numero="2"
          nombre="Ana"
          onClick={() => handleVendorClick({ numero: "2", nombre: "Ana" })}
        />
        <VendedorBoton
          numero="3"
          nombre="Pedro"
          onClick={() => handleVendorClick({ numero: "3", nombre: "Pedro" })}
        />
        <VendedorBoton
          numero="4"
          nombre="Maria"
          onClick={() => handleVendorClick({ numero: "4", nombre: "Maria" })}
        />
        <VendedorBoton
          numero="5"
          nombre="Luis"
          onClick={() => handleVendorClick({ numero: "5", nombre: "Luis" })}
        />
        <VendedorBoton
          numero="6"
          nombre="Sofia"
          onClick={() => handleVendorClick({ numero: "6", nombre: "Sofia" })}
        />
        <VendedorBoton
          numero="7"
          nombre="Carlos"
          onClick={() => handleVendorClick({ numero: "7", nombre: "Carlos" })}
        />
        <VendedorBoton
          numero="8"
          nombre="Laura"
          onClick={() => handleVendorClick({ numero: "8", nombre: "Laura" })}
        />
        <VendedorBoton
          numero="9"
          nombre="Diego"
          type="button"
          onClick={() => handleVendorClick({ numero: "9", nombre: "Diego" })}
        />
        <VendedorBoton
          numero="10"
          nombre="Julia"
          onClick={() => handleVendorClick({ numero: "10", nombre: "Julia" })}
        />
        <VendedorBoton
          type="button"
          numero="11"
          nombre="Roberto"
          onClick={() => handleVendorClick({ numero: "11", nombre: "Roberto" })}
        />
        <VendedorBoton
          numero="12"
          nombre="Carmen"
          onClick={() => handleVendorClick({ numero: "12", nombre: "Carmen" })}
        />
        <VendedorBoton
          numero="13"
          nombre="Daniel"
          onClick={() => handleVendorClick({ numero: "13", nombre: "Daniel" })}
        />
        <VendedorBoton
          numero="14"
          nombre="Isabel"
          onClick={() => handleVendorClick({ numero: "14", nombre: "Isabel" })}
        />
        <VendedorBoton
          numero="15"
          nombre="Pablo"
          onClick={() => handleVendorClick({ numero: "15", nombre: "Pablo" })}
        />
        <VendedorBoton
          numero="16"
          nombre="Pablo"
          onClick={() => handleVendorClick({ numero: "16", nombre: "Pablo" })}
        />
        <VendedorBoton 
          numero="17"
          nombre="Pablo"
          onClick={() => handleVendorClick({ numero: "17", nombre: "Pablo" })}
        />
        <VendedorBoton
          numero="18"
          nombre="Pablo"
          onClick={() => handleVendorClick({ numero: "18", nombre: "Pablo" })}
        />
        <VendedorBoton
          numero="19"
          nombre="Pablo"
          onClick={() => handleVendorClick({ numero: "19", nombre: "Pablo" })}
        />
        <VendedorBoton
          numero="20"
          nombre="Pablo"
          onClick={() => handleVendorClick({ numero: "20", nombre: "Pablo" })}
        />
        <VendedorBoton
          numero="21"
          nombre="Pablo"
          onClick={() => handleVendorClick({ numero: "21", nombre: "Pablo" })}
        />
        <VendedorBoton
          numero="22"
          nombre="Pablo"
          onClick={() => handleVendorClick({ numero: "22", nombre: "Pablo" })}
        />
        <VendedorBoton
          numero="23"
          nombre="Pablo"
          onClick={() => handleVendorClick({ numero: "23", nombre: "Pablo" })}
        />
        <VendedorBoton
          numero="24"
          nombre="Pablo"
          onClick={() => handleVendorClick({ numero: "24", nombre: "Pablo" })}
        />
      </div>

      {selectedVendor && (
        <PasswordModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handlePasswordSubmit}
          vendorName={selectedVendor.nombre}
        />
      )}
    </main>
  );
}
