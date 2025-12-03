"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterGate() {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/login") || pathname.startsWith("/register");
  if (hideFooter) return null;
  return <Footer />;
}
