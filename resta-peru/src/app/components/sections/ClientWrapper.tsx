// src/components/ClientWrapper.tsx
"use client";

import ResolutionWrapper from "@/componentsSections/ResolutionWrapper";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // ResolutionWrapper es un componente de cliente, por lo que este wrapper también lo es.
  return <ResolutionWrapper>{children}</ResolutionWrapper>;
}