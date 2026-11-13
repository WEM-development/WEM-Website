interface BrandMarkProps {
  size?: number;
  className?: string;
}

// Proportions of the triangle in the WEM logo
export default function BrandMark({ size = 8, className = "" }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-brand ${className}`}
      style={{
        width: size,
        height: size * 1.5,
        clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
      }}
    />
  );
}
