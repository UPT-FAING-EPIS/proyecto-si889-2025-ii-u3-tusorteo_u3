"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderGate() {
  const pathname = usePathname();
  const hideHeader = pathname?.startsWith("/login") || pathname?.startsWith("/register");
  if (hideHeader) return null;
  return <Header />;
}
