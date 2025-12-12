export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">O nás</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Naše historie</h2>
          <p className="text-lg">
            Welding Montáže je předním dodavatelem svařovacích služeb a ocelových 
            konstrukcí v Ostravě a okolí. Naše společnost byla založena s vizí 
            poskytovat kvalitní produkty a služby zákazníkům v průmyslovém sektoru.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Naše hodnoty</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Kvalita a preciznost</li>
            <li>Spolehlivost a důvěryhodnost</li>
            <li>Inovace a profesionalita</li>
            <li>Spokojenost zákazníků</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Proč si vybrat nás</h2>
          <p className="text-lg">
            Jsme tým zkušených profesionálů se zaměřením na moderní svařovací 
            technologie a kvalitní zpracování oceli. Naše služby zahrnují kompletní 
            řešení od návrhu až po finální realizaci.
          </p>
        </section>
      </div>
    </div>
  );
}
