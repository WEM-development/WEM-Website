"use client"

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ImageSlider from "@/components/common/ImageSlider";
import ContactBand from "@/components/common/ContactBand";
import Reveal from "@/components/common/Reveal";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import { company } from "@/config/company";
import { projects } from "@/config/projects";

export default function ReferencesPage() {
  return (
    <div data-site className="min-h-screen bg-paper text-ink">
      <Navigation />

      {/* Overview */}
      <Section isPageIntro>
        <SectionHeading
          as="h1"
          eyebrow="Reference"
          title="Naše realizace"
          lead="Naší hlavní činností je výroba a&nbsp;montáž potrubních celků a&nbsp;menších ocelových konstrukcí."
        />
        <ol className="mt-14 grid gap-2 md:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.id}>
              <Link
                href={`#${project.id}`}
                className="group flex h-full items-start gap-4 rounded-sm bg-mist p-6 transition-colors hover:bg-neutral-200"
              >
                <span className="pt-0.5 text-sm font-semibold tabular-nums text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold tracking-tight">{project.title}</span>
                  {project.client && <span className="mt-1 block text-sm text-neutral-500">{project.client}</span>}
                </span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {projects.map((project, index) => (
        <Section key={project.id} id={project.id} tone={index % 2 === 0 ? "mist" : "paper"}>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Description */}
            <div className="lg:order-2 lg:col-span-4">
              <p className="text-sm font-semibold tabular-nums text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight">{project.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-neutral-600">{project.description}</p>
              {project.client && (
                <dl className="mt-8 grid grid-cols-[6rem_1fr] gap-y-3">
                  <dt className="text-sm text-neutral-500">Zákazník</dt>
                  <dd className="font-semibold">{project.client}</dd>
                </dl>
              )}
              <a
                href={`mailto:${company.email}`}
                className="mt-10 inline-block text-sm font-semibold hover:underline hover:underline-offset-4"
              >
                Poptat podobnou zakázku →
              </a>
            </div>

            {/* Gallery */}
            <Reveal className="lg:order-1 lg:col-span-8">
              <ImageSlider
                images={project.images}
                alt={project.title}
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </Reveal>
          </div>
        </Section>
      ))}

      <ContactBand />
      <Footer />
    </div>
  );
}
