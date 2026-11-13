export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export const services: Service[] = [
  {
    id: "steel-product",
    title: "Výroba ocelových konstrukcí a\u00a0potrubních celků",
    description: "Montáž potrubí všech dimenzí a\u00a0ocelových konstrukcí.",
    image: "/assets/steel-product-images/pipe-complex.png",
    href: "/products#steel-product",
  },
  {
    id: "welding-product",
    title: "Svářečské opravy a\u00a0zámečnické práce",
    description: "Opravy strojů a\u00a0zámečnická výroba. Metody EN\u00a0141, 111 a\u00a0136.",
    image: "/assets/welding-product-images/excavator.jpg",
    href: "/products#welding-product",
  },
];
