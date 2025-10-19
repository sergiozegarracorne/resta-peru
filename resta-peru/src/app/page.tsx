"use client";
import VendedorBoton from "@/componentsUI/VendedorBoton";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-0">
      <div className="flex flex-wrap justify-start gap-2 pt-2">
        <VendedorBoton
          numero="1"
          nombre="Juan"
          onClick={() => console.log("Vendedor 1")}
        />
        <VendedorBoton
          numero="2"
          nombre="Ana"
          onClick={() => console.log("Vendedor 2")}
        />
        <VendedorBoton
          numero="3"
          nombre="Pedro"
          onClick={() => console.log("Vendedor 3")}
        />
        <VendedorBoton
          numero="4"
          nombre="Maria"
          onClick={() => console.log("Vendedor 4")}
        />
        <VendedorBoton
          numero="5"
          nombre="Luis"
          onClick={() => console.log("Vendedor 5")}
        />
        <VendedorBoton
          numero="6"
          nombre="Sofia"
          onClick={() => console.log("Vendedor 6")}
        />
        <VendedorBoton
          numero="7"
          nombre="Carlos"
          onClick={() => console.log("Vendedor 7")}
        />
        <VendedorBoton
          numero="8"
          nombre="Laura"
          onClick={() => console.log("Vendedor 8")}
        />
        <VendedorBoton
          numero="9"
          nombre="Diego"
          onClick={() => console.log("Vendedor 9")}
        />
        <VendedorBoton
          numero="10"
          nombre="Julia"
          onClick={() => console.log("Vendedor 10")}
        />
        <VendedorBoton
          numero="11"
          nombre="Roberto"
          onClick={() => console.log("Vendedor 11")}
        />
        <VendedorBoton
          numero="12"
          nombre="Carmen"
          onClick={() => console.log("Vendedor 12")}
        />
        <VendedorBoton
          numero="13"
          nombre="Daniel"
          onClick={() => console.log("Vendedor 13")}
        />
        <VendedorBoton
          numero="14"
          nombre="Isabel"
          onClick={() => console.log("Vendedor 14")}
        />
        <VendedorBoton
          numero="15"
          nombre="Pablo"
          onClick={() => console.log("Vendedor 15")}
        />
        <VendedorBoton
          numero="16"
          nombre="Elena"
          onClick={() => console.log("Vendedor 16")}
        />
        <VendedorBoton
          numero="17"
          nombre="Javier"
          onClick={() => console.log("Vendedor 17")}
        />
        <VendedorBoton
          numero="18"
          nombre="Marta"
          onClick={() => console.log("Vendedor 18")}
        />
        <VendedorBoton
          numero="19"
          nombre="Fernando"
          onClick={() => console.log("Vendedor 19")}
        />
        <VendedorBoton
          numero="20"
          nombre="Natalia"
          onClick={() => console.log("Vendedor 20")}
        />
      </div>
    </main>
  );
}
