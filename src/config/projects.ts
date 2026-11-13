export interface Project {
  id: string;
  title: string;
  client?: string;
  description: string;
  image: string;
  images: string[];
  href: string;
}

const projectImages = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/assets/projects/${dir}/${String(i + 1).padStart(2, "0")}.webp`);

export const projects: Project[] = [
  {
    id: "kotelny",
    title: "Kotelny",
    client: "VAE Energo",
    description: "Výroba a\u00a0montáž potrubních rozvodů v\u00a0kotelnách.",
    image: "/assets/projects/kotelny/16.webp",
    images: projectImages("kotelny", 28),
    href: "/references#kotelny",
  },
  {
    id: "liniove-stavby",
    title: "Liniové stavby",
    description: "Montáž potrubí na liniových stavbách.",
    image: "/assets/projects/liniove-stavby/01.webp",
    images: projectImages("liniove-stavby", 5),
    href: "/references#liniove-stavby",
  },
  {
    id: "trinecke-zelezarny",
    title: "Výměna armatur a\u00a0uzávěrů",
    client: "Třinecké železárny",
    description: "Výměna armatur a\u00a0uzávěrů na potrubních rozvodech v\u00a0provozu Třineckých železáren.",
    image: "/assets/projects/trinecke-zelezarny/03.webp",
    images: projectImages("trinecke-zelezarny", 15),
    href: "/references#trinecke-zelezarny",
  },
];
