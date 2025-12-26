import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

export default function WEMLogo({ width = 72, height = 72 }: LogoProps) {
  return (
    <Image src={"https://firebasestorage.googleapis.com/v0/b/wem-website.firebasestorage.app/o/company_logos%2FWEM-logo.svg?alt=media&token=5e397b47-cc5c-4c0c-873c-1dec6f542470"} alt="WEM Logo" width={width} height={height} priority />
  );
}
