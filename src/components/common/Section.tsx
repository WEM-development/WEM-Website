import React from "react";

export type SectionTone = "paper" | "mist" | "ink";

const toneClasses: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  ink: "bg-ink text-white",
};

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  isPageIntro?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Section({
  id,
  tone = "paper",
  isPageIntro = false,
  className = "",
  children,
}: SectionProps) {
  const spacingClasses = isPageIntro ? "pb-20 pt-12 md:pb-28 md:pt-16" : "py-20 md:py-28";

  return (
    <section id={id} className={`scroll-mt-20 ${spacingClasses} ${toneClasses[tone]} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
