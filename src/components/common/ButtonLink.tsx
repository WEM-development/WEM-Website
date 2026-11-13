import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "inverse";
export type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-ink hover:bg-brand-strong",
  secondary: "bg-ink text-white hover:bg-neutral-800",
  inverse: "bg-white text-ink hover:bg-neutral-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-xs uppercase tracking-[0.15em]",
  md: "h-12 px-6 text-sm",
};

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export default function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-sm font-semibold transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
