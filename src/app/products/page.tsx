export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Products</h1>
      <p className="text-lg mb-4">Discover our range of quality products and services.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Welding Products</h2>
          <p>High-quality welding materials and accessories for professional use.</p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Steel Products</h2>
          <p>Wide selection of steel profiles and materials for your projects.</p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Custom Services</h2>
          <p>Specialized services tailored to your specific needs.</p>
        </div>
      </div>
    </div>
  );
}
