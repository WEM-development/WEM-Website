"use client"

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ImageSlider from "@/components/common/ImageSlider";
import BrandMark from "@/components/common/BrandMark";
import ButtonLink from "@/components/common/ButtonLink";
import ContactBand from "@/components/common/ContactBand";
import Reveal from "@/components/common/Reveal";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import ServiceCard from "@/components/common/ServiceCard";
import { company } from "@/config/company";
import { projects } from "@/config/projects";
import { services } from "@/config/services";

const workshopImages = [
  "/assets/workshop-one.jpeg",
  "/assets/workshop-two.jpeg",
  "/assets/workshop-three.jpg",
  "/assets/workshop-four.jpg",
  "/assets/workshop-five.jpg",
];

export default function HomePage() {
  return (
    <div data-site className="min-h-screen bg-paper text-ink">
      <Navigation />

      {/* Hero */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-10 sm:px-6 md:pb-28 md:pt-16 lg:grid-cols-12 lg:items-center lg:px-8">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              <BrandMark />
              {company.name} · Havířov
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Výroba a&nbsp;montáž potrubních celků a&nbsp;ocelových konstrukcí
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
              Pracujeme v&nbsp;kotelnách, průmyslových provozech i&nbsp;na liniových stavbách. Zázemí máme v&nbsp;Havířově.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href={`mailto:${company.email}`}>Poptat zakázku</ButtonLink>
              <Link href="#projects" className="text-sm font-semibold hover:underline hover:underline-offset-4">
                Naše realizace →
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-200">
              <Image
                src="/assets/projects/kotelny/14.webp"
                alt="Izolované potrubí v&nbsp;kotelně"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section tone="mist">
        <SectionHeading eyebrow="Služby" title="Co děláme" />
        <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.08}>
              <ServiceCard
                index={index + 1}
                title={service.title}
                description={service.description}
                image={service.image}
                href={service.href}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <SectionHeading
          eyebrow="Reference"
          title="Naše realizace"
          lead="Naší hlavní činností je výroba a&nbsp;montáž potrubních celků a&nbsp;menších ocelových konstrukcí."
        />
        <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <ServiceCard
                index={index + 1}
                title={project.title}
                description={project.client}
                image={project.image}
                href={project.href}
              />
            </Reveal>
          ))}
        </div>
        <Link
          href="/references"
          className="mt-12 inline-block text-sm font-semibold hover:underline hover:underline-offset-4"
        >
          Všechny reference →
        </Link>
      </Section>

      {/* Workshop */}
      <Section id="workshop" tone="mist">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Havířov" title="Naše hala" />
            <Reveal className="mt-10">
              <ImageSlider
                images={workshopImages}
                alt="Naše hala"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </Reveal>
            <div className="mt-10 max-w-2xl space-y-4 text-lg leading-relaxed text-neutral-600">
              <p>Výrobní hala s&nbsp;mostovým jeřábem a&nbsp;plně vybavenou dílnou.</p>
              <p>
                Vyrábíme a&nbsp;montujeme ocelové konstrukce a&nbsp;potrubní celky, svařujeme a&nbsp;zajišťujeme zámečnickou
                výrobu. Chceme být spolehlivým dlouhodobým partnerem.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-xl font-semibold tracking-tight">Kde nás najdete</h3>
            <div className="mt-5 h-80 overflow-hidden rounded-sm bg-neutral-200 grayscale transition duration-500 hover:grayscale-0 lg:h-[28rem]">
              <iframe
                title="Mapa – Welding Montáže"
                src={company.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={company.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm font-semibold hover:underline hover:underline-offset-4"
            >
              Otevřít v&nbsp;Google Maps →
            </a>
          </div>
        </div>
      </Section>

      <ContactBand />
      <Footer />
    </div>
  );
}


