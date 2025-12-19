export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Maintenance Section */}
      <section className="flex items-center justify-center min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-12 text-center">
            {/* Construction Icon */}
            <div className="text-8xl mb-8">🚧</div>
            
            {/* Main Heading */}
            <h1 className="text-5xl font-bold mb-6">
              Stránky jsou ve výstavbě
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl text-gray-700 mb-8">
              Probíhá pravidelná údržba
            </p>
            
            {/* Description */}
            <div className="rounded-lg p-8 mb-8">
              <p className="text-lg text-gray-800 mb-4">
                Naše webové stránky právě procházejí rekonstrukcí a pravidelnou údržbou, 
                abychom vám mohli přinést ještě lepší služby a uživatelský zážitek.
              </p>
              <p className="text-lg text-gray-800">
                Děkujeme za vaši trpělivost a pochopení. Brzy se k vám vrátíme!
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold mb-4">
                Welding Montáže
              </h2>
              <p className="text-gray-600 mb-6">
                Profesionální svařovací služby v Ostravě
              </p>
              <div className="flex flex-col gap-3 items-center">
                <a href="mailto:info@weldingmontaze.cz" className="text-lg text-blue-600 hover:text-blue-800 transition flex items-center gap-2">
                  <span>info@weldingmontaze.cz</span>
                </a>
                <a href="tel:+420773266677" className="text-lg text-blue-600 hover:text-blue-800 transition flex items-center gap-2">
                  <span>+420 773 266 677</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - COMMENTED OUT */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Naše služby</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg hover:shadow-xl transition">
              <div className="text-blue-600 text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold mb-4">Svařování MIG/MAG</h3>
              <p className="text-gray-700">
                Profesionální svařování metodou MIG/MAG pro ocelové konstrukce, 
                potrubí a nádrže. Zajišťujeme vysokou kvalitu a preciznost každého 
                svaru.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg hover:shadow-xl transition">
              <div className="text-blue-600 text-4xl mb-4">🔧</div>
              <h3 className="text-2xl font-semibold mb-4">Montáže konstrukcí</h3>
              <p className="text-gray-700">
                Komplexní montáže ocelových konstrukcí včetně hal, skladů, mostů 
                a průmyslových staveb. Realizujeme projekty od malých po velké.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg hover:shadow-xl transition">
              <div className="text-blue-600 text-4xl mb-4">📐</div>
              <h3 className="text-2xl font-semibold mb-4">Výroba na zakázku</h3>
              <p className="text-gray-700">
                Zakázková výroba ocelových dílů a konstrukcí podle vašich požadavků. 
                Od návrhu přes výrobu až po finální montáž.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Why Choose Us - COMMENTED OUT */}
      {/* <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Proč si vybrat nás</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="text-blue-600 text-3xl">✓</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Zkušený tým</h3>
                <p className="text-gray-700">
                  Náš tým tvoří certifikovaní svářeči a montéři s dlouholetou praxí 
                  v oboru.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-blue-600 text-3xl">✓</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Moderní technologie</h3>
                <p className="text-gray-700">
                  Využíváme nejnovější svařovací technologie a vybavení pro dosažení 
                  nejvyšší kvality.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-blue-600 text-3xl">✓</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Flexibilita</h3>
                <p className="text-gray-700">
                  Přizpůsobíme se vašim požadavkům a termínům. Realizujeme projekty 
                  malého i velkého rozsahu.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-blue-600 text-3xl">✓</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Kvalita a certifikace</h3>
                <p className="text-gray-700">
                  Všechny naše práce odpovídají nejvyšším kvalitativním standardům 
                  a normám.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Reference Section - COMMENTED OUT */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Naše reference</h2>
          <p className="text-center text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Jsme hrdí na naše projekty realizované pro významné společnosti v regionu. 
            Mezi naše klienty patří průmyslové podniky, stavební firmy i soukromí 
            investoři z Ostravy a okolí.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-700">Realizovaných projektů</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <p className="text-gray-700">Let zkušeností</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-700">Spokojenost zákazníků</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section - COMMENTED OUT */}
      {/* <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Máte projekt na míru?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Kontaktujte nás a my vám připravíme nezávaznou cenovou nabídku. 
            Rádi probereme vaše požadavky a najdeme optimální řešení.
          </p>
          <a 
            href="/contact" 
            className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-block"
          >
            Získat cenovou nabídku
          </a>
        </div>
      </section> */}
    </div>
  );
}


