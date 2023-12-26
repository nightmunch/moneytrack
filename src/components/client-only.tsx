"use client";

import { useEffect, useState } from "react";

export default function ClientOnly({
  children,
  LoadingComponent,
}: {
  children: React.ReactNode;
  LoadingComponent: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return LoadingComponent;

  return children;
}
