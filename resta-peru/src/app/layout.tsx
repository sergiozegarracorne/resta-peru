import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResolutionWrapper from "@/componentsSections/ResolutionWrapper"; // Ajusta la ruta si es necesario
import TitleBar from "@/componentsSections/TitleBar";
import styles from '@/styles/Layout.module.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resta-Perú",
  description: "Sistema de gestión para restaurantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* El ResolutionWrapper ahora contiene la estructura completa */}
        <ResolutionWrapper>
          <TitleBar title="Lista de Vendedores" />
          <main className={styles.mainContent}>
            {children}
          </main>
        </ResolutionWrapper>
      </body>
    </html>
  );
}
