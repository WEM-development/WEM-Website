import React from "react";
import { Link } from "@heroui/react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-6 text-white">Welding Montáže</h2>
          <ul className="flex justify-center gap-6 mb-6">
            <li>
              <Link href="https://www.facebook.com/profile.php?id=61572748663542" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/assets/social-icons/fb.png"
                  alt="Facebook"
                  width={32}
                  height={32}
                  className="hover:opacity-80 transition invert brightness-0"
                />
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/welding_montaze/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/assets/social-icons/ig.png"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className="hover:opacity-80 transition invert brightness-0"
                />
              </Link>
            </li>
            <li>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/assets/social-icons/in.png"
                  alt="LinkedIn"
                  width={32}
                  height={32}
                  className="hover:opacity-80 transition invert brightness-0"
                />
              </Link>
            </li>
          </ul>
        </div>
        <ul className="text-center text-sm text-gray-300 space-y-2">
          <li className="text-gray-300">&copy; Welding montáže. Všechny práva vyhrazena.</li>
          <li>
            <Link 
              href="https://github.com/Ma-tes" 
              target="_blank" 
              className="text-gray-300 hover:text-white transition"
            >
              Developer: Ma-tes
            </Link>
          </li>
          <li>
            <Link 
              href="https://github.com/WEM-development" 
              target="_blank"
              className="text-gray-300 hover:text-white transition"
            >
              GitHub: WEM-development
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
