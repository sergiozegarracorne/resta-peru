

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/componentsSections/ClientWrapper"; // Importamos el nuevo wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resta Perú",
  description: "Sistema de gestión para restaurantes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* El viewportContainer centra el contenido en la pantalla */}
      <body className={`${inter.className} viewportContainer`}>
        {/* ClientWrapper ahora envuelve a los children, manteniendo este layout como Server Component */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}