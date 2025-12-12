export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Naše produkty a služby</h1>
      <p className="text-lg mb-4">Objevte náš sortiment kvalitních produktů a profesionálních služeb.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Svařovací technika</h2>
          <p>Kompletní sortiment svářecích zařízení a materiálů pro profesionální využití.</p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Ocelové konstrukce</h2>
          <p>Široký výběr ocelových profilů a materiálů pro vaše projekty.</p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Služby na míru</h2>
          <p>Specializované služby šité na míru vašim konkrétním potřebám.</p>
        </div>
      </div>
    </div>
  );
}
