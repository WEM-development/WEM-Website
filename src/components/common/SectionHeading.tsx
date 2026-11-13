import BrandMark from "@/components/common/BrandMark";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";
  const isDark = tone === "dark";

  return (
    <div className={`${isCentered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${
            isCentered ? "justify-center" : ""
          } ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
        >
          <BrandMark />
          {eyebrow}
        </p>
      )}
      <Heading
        className={`mt-5 font-bold tracking-tight ${
          Heading === "h1"
            ? "text-4xl leading-[1.05] md:text-6xl"
            : "text-3xl leading-tight md:text-4xl"
        }`}
      >
        {title}
      </Heading>
      {lead && (
        <p
          className={`mt-6 max-w-2xl text-lg leading-relaxed ${isCentered ? "mx-auto" : ""} ${
            isDark ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
