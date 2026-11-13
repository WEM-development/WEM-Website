import Section from "@/components/common/Section";
import SectionHeading from "@/components/common/SectionHeading";
import ButtonLink from "@/components/common/ButtonLink";
import { company, owners, toPhoneHref } from "@/config/company";

interface ContactBandProps {
  title?: string;
  lead?: string;
}

export default function ContactBand({
  title = "Poptejte u\u00a0nás zakázku",
  lead = "Poptávky zatím přijímáme e-mailem. Popište, co potřebujete vyrobit nebo opravit.",
}: ContactBandProps) {
  return (
    <Section id="contact" tone="ink">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <SectionHeading
          eyebrow="Kontakt"
          title={title}
          lead={lead}
          tone="dark"
          className="lg:col-span-7"
        />
        <div className="lg:col-span-5 lg:justify-self-end">
          <ButtonLink href={`mailto:${company.email}`} className="w-full sm:w-auto">
            {company.email}
          </ButtonLink>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {owners.map((owner) => (
              <li key={owner.name}>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{owner.name}</p>
                <a
                  href={toPhoneHref(owner.phone)}
                  className="mt-1 inline-block whitespace-nowrap text-lg font-semibold tabular-nums text-white hover:underline hover:underline-offset-4"
                >
                  {owner.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
