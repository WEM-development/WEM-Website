"use client"

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ImageSlider from "@/components/common/ImageSlider";
import BrandMark from "@/components/common/BrandMark";
import ContactBand from "@/components/common/ContactBand";
import Reveal from "@/components/common/Reveal";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import { company } from "@/config/company";
import { services } from "@/config/services";

const steelImages = [
  "/assets/steel-product-images/pipe-complex.png",
  "/assets/steel-product-images/20200228_114633.jpg",
  "/assets/steel-product-images/20210212_140350.jpg",
  "/assets/steel-product-images/20210720_130349.jpg",
  "/assets/steel-product-images/20210817_101923.jpg",
  "/assets/steel-product-images/20210817_101933.jpg",
  "/assets/steel-product-images/20220118_144225.jpg",
  "/assets/steel-product-images/20220118_144229.jpg",
  "/assets/steel-product-images/20220118_144246.jpg",
  "/assets/steel-product-images/20220118_144305.jpg",
  "/assets/steel-product-images/20220118_144327.jpg",
  "/assets/steel-product-images/20220203_133511.jpg",
  "/assets/steel-product-images/20220414_103301.jpg",
  "/assets/steel-product-images/pipe.png",
  "/assets/steel-product-images/pipe-moment.png",
];

const weldingImages = [
  "/assets/welding-product-images/excavator.jpg",
  "/assets/welding-product-images/excavator-before.jpg",
  "/assets/welding-product-images/excavator-after.jpg",
  "/assets/welding-product-images/excavator-two-before.jpg",
  "/assets/welding-product-images/excavator-two-after.png",
  "/assets/welding-product-images/spoon-back.jpeg",
  "/assets/welding-product-images/spoon-back-color.jpeg",
  "/assets/welding-product-images/spoon-inside.jpeg",
  "/assets/welding-product-images/20220727_190508.jpg",
  "/assets/welding-product-images/20230524_132329.jpg",
  "/assets/welding-product-images/20230524_150735.jpg",
];

interface ServiceDetail {
  images: string[];
  paragraphs: string[];
  facts: string[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "steel-product": {
    images: steelImages,
    paragraphs: ["Máme dlouholeté zkušenosti s\u00a0montáží potrubí všech dimenzí a\u00a0ocelových konstrukcí."],
    facts: ["Výroba potrubních celků", "Montáž potrubí všech dimenzí", "Ocelové konstrukce"],
  },
  "welding-product": {
    images: weldingImages,
    paragraphs: [
      "Svařujeme metodami EN\u00a0141, 111 a\u00a0136.",
      "Opravujeme stroje a\u00a0vyrábíme mříže, žebříky, ploty, brány a\u00a0pažicí boxy.",
    ],
    facts: ["Metody EN\u00a0141, 111, 136", "Opravy strojů", "Mříže, žebříky, ploty a\u00a0brány", "Pažicí boxy"],
  },
};

export default function ProductsPage() {
  return (
    <div data-site className="min-h-screen bg-paper text-ink">
      <Navigation />

      {/* Overview */}
      <Section isPageIntro>
        <SectionHeading
          as="h1"
          eyebrow="Služby"
          title="Produkty a&nbsp;služby"
          lead="Výroba, montáž a&nbsp;opravy z&nbsp;oceli – od potrubních celků po jednotlivé zámečnické výrobky."
        />
        <ol className="mt-14 grid gap-2 md:grid-cols-2">
          {services.map((service, index) => (
            <li key={service.id}>
              <Link
                href={`#${service.id}`}
                className="group flex h-full items-start gap-4 rounded-sm bg-mist p-6 transition-colors hover:bg-neutral-200"
              >
                <span className="pt-0.5 text-sm font-semibold tabular-nums text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-semibold tracking-tight">{service.title}</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {services.map((service, index) => {
        const detail = serviceDetails[service.id];

        return (
          <Section key={service.id} id={service.id} tone={index % 2 === 0 ? "mist" : "paper"}>
            <div className="grid gap-12 lg:grid-cols-12">
              {/* Description */}
              <div className="lg:order-2 lg:col-span-4">
                <p className="text-sm font-semibold tabular-nums text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight">{service.title}</h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-600">
                  {detail.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-8 space-y-3">
                  {detail.facts.map((fact) => (
                    <li key={fact} className="flex items-center gap-3">
                      <BrandMark size={6} />
                      {fact}
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-10 inline-block text-sm font-semibold hover:underline hover:underline-offset-4"
                >
                  Poptat zakázku →
                </a>
              </div>

              {/* Gallery */}
              <Reveal className="lg:order-1 lg:col-span-8">
                <ImageSlider
                  images={detail.images}
                  alt={service.title}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </Reveal>
            </div>
          </Section>
        );
      })}

      <ContactBand />
      <Footer />
    </div>
  );
}
