"use client";

import { ReactNode, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/modules/auth/services/supabaseClient";

type ProtectedLinkProps = {
  href: string;
  fallbackHref?: string;
  className?: string;
  children: ReactNode;
  title?: string;
  ariaLabel?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export default function ProtectedLink({
  href,
  fallbackHref = "/login",
  className,
  children,
  title,
  ariaLabel,
  onClick,
}: ProtectedLinkProps) {
  const router = useRouter();

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    e.preventDefault();

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push(href);
      } else {
        router.push(fallbackHref);
      }
    } catch (error) {
      router.push(fallbackHref);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}