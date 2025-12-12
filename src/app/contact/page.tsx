export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Kontaktujte nás</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Welding Montáže s.r.o.</h2>
          <p className="text-lg">
            Jsme tu pro vás a rádi zodpovíme vaše dotazy a pomůžeme s realizací 
            vašich projektů.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Kontaktní údaje</h2>
          <div className="space-y-3 text-lg">
            <p><strong>Adresa:</strong> Ostrava, Česká republika</p>
            <p><strong>Email:</strong> info@weldingmontaze.cz</p>
            <p><strong>Telefon:</strong> +420 XXX XXX XXX</p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Pracovní doba</h2>
          <p className="text-lg">
            Pondělí - Pátek: 7:00 - 16:00<br/>
            Sobota - Neděle: Zavřeno
          </p>
        </section>
      </div>
    </div>
  );
}
