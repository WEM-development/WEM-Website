"use client"

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ContactBand from "@/components/common/ContactBand";
import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import { company, owners, toPhoneHref } from "@/config/company";

const detailLinkClasses = "whitespace-nowrap font-semibold hover:underline hover:underline-offset-4";

export default function AboutPage() {
  return (
    <div data-site className="min-h-screen bg-paper text-ink">
      <Navigation />

      {/* Owners */}
      <Section isPageIntro>
        <SectionHeading as="h1" eyebrow="O&nbsp;společnosti" title="Majitelé" />
        <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {owners.map((owner) => (
            <div key={owner.name}>
              <h2 className="text-2xl font-semibold tracking-tight">{owner.name}</h2>
              <dl className="mt-6 grid grid-cols-[6rem_1fr] gap-y-3">
                {owner.ico && (
                  <>
                    <dt className="text-sm text-neutral-500">IČO</dt>
                    <dd className="tabular-nums">{owner.ico}</dd>
                  </>
                )}
                {owner.dic && (
                  <>
                    <dt className="text-sm text-neutral-500">DIČ</dt>
                    <dd className="tabular-nums">{owner.dic}</dd>
                  </>
                )}
                <dt className="text-sm text-neutral-500">Telefon</dt>
                <dd>
                  <a href={toPhoneHref(owner.phone)} className={`tabular-nums ${detailLinkClasses}`}>
                    {owner.phone}
                  </a>
                </dd>
                <dt className="text-sm text-neutral-500">E-mail</dt>
                <dd>
                  <a href={`mailto:${company.email}`} className={detailLinkClasses}>
                    {company.email}
                  </a>
                </dd>
              </dl>
            </div>
          ))}
        </div>
      </Section>

      <ContactBand />
      <Footer />
    </div>
  );
}
