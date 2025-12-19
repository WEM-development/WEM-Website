import Image from "next/image";
import Logo from "../../../assets/WEM.svg";

interface LogoProps {
  width?: number;
  height?: number;
}

export default function WEMLogo({ width = 72, height = 72 }: LogoProps) {
  return (
    <Image src={Logo} alt="WEM Logo" width={width} height={height} priority />
  );
}
