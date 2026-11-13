export interface CompanyOwner {
  name: string;
  phone: string;
  ico?: string;
  dic?: string;
}

export interface SiteLink {
  name: string;
  href: string;
}

export interface SocialLink extends SiteLink {
  icon: string;
}

export const company = {
  name: "Welding Montáže",
  tagline: "Výroba a\u00a0montáž potrubních celků a\u00a0ocelových konstrukcí v\u00a0Ostravě.",
  email: "info@weldingmontaze.cz",
  mapUrl: "https://maps.app.goo.gl/wrF3SdjLAt1T56Y57",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d786.5160882822947!2d18.2855611737851!3d49.82572549874255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713e3b0617d0c03%3A0x61bf6c3d515c0a80!2zV2VsZGluZyBNb250w6HFvmU!5e0!3m2!1scs!2scz!4v1739118062231!5m2!1scs!2scz",
};

export const owners: CompanyOwner[] = [
  { name: "Tomáš Walter", phone: "+420 773 266 677", ico: "08604134", dic: "CZ8708065619" },
  { name: "Milan Chovanec", phone: "+420 774 357 693" },
];

export const siteLinks: SiteLink[] = [
  { name: "Domů", href: "/" },
  { name: "Produkty", href: "/products" },
  { name: "Reference", href: "/references" },
  { name: "O společnosti", href: "/about" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61572748663542",
    icon: "/assets/social-icons/fb.png",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/welding_montaze/",
    icon: "/assets/social-icons/ig.png",
  },
];

export const toPhoneHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
