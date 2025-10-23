"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    // Si la cuenta regresiva llega a 0, redirigir al inicio.
    if (countdown <= 0) {
      router.push("/");
      return;
    }

    // Configurar el intervalo para que se ejecute cada segundo.
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Función de limpieza: se ejecuta si el usuario navega a otro lado
    // antes de que termine el contador, para evitar errores.
    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <main className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
      <div className="max-w-lg text-center">
        {/* Imagen SVG moderna con una animación sutil */}
        <svg
          className="mx-auto h-24 w-24 animate-pulse text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        
        <h2 className="mt-2 text-3xl font-semibold text-gray-300">
          Lugar no encontrado
        </h2>
        <p className="mt-6 mb-4 text-lg text-gray-400">
          Lo sentimos, el lugar que buscas no existe o fue movido.
        </p>

        {/* Enlace grande para volver al inicio */}
        <div className="mt-10">
          <Link
            href="/"
            className="transform rounded-lg bg-blue-600 px-8 py-4 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
          >
            Volver al Inicio
          </Link>
        </div>

        {/* Mensaje con el contador */}
        <p className="mt-8 text-sm text-gray-500">
          Serás redirigido automáticamente en {countdown} segundos...
        </p>
      </div>
    </main>
  );
}