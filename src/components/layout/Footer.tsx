import React from "react";
import Link from "next/link";
import Image from "next/image";
import BrandMark from "@/components/common/BrandMark";
import { company, owners, siteLinks, socialLinks, toPhoneHref } from "@/config/company";

const footerHeadingClasses = "text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500";
const footerLinkClasses = "text-white hover:underline hover:underline-offset-4";

export default function Footer() {
  return (
    <footer className="bg-ink text-sm text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white">
              <BrandMark size={10} />
              {company.name}
            </p>
            <p className="mt-4 max-w-xs leading-relaxed">{company.tagline}</p>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h2 className={footerHeadingClasses}>Kontakt</h2>
            <ul className="mt-5 space-y-3">
              {owners.map((owner) => (
                <li key={owner.name}>
                  <a href={toPhoneHref(owner.phone)} className={`whitespace-nowrap tabular-nums ${footerLinkClasses}`}>
                    {owner.phone}
                  </a>
                  <span className="ml-3">{owner.name}</span>
                </li>
              ))}
              <li>
                <a href={`mailto:${company.email}`} className={footerLinkClasses}>
                  {company.email}
                </a>
              </li>
              <li>
                <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className={footerLinkClasses}>
                  Zobrazit na mapě →
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h2 className={footerHeadingClasses}>Navigace</h2>
            <ul className="mt-5 space-y-3">
              {siteLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClasses}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex gap-5">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                    <Image
                      src={social.icon}
                      alt=""
                      width={22}
                      height={22}
                      className="brightness-0 invert opacity-70 transition-opacity hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-16 flex flex-col gap-3 text-xs text-neutral-500 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {company.name}. Všechna práva vyhrazena.</p>
          <div className="flex gap-6">
            <a href="https://github.com/Ma-tes" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Developer: Ma-tes
            </a>
            <a href="https://github.com/WEM-development" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              GitHub: WEM-development
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
