export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to WEM</h1>
      <p className="text-lg mb-6">
        Your trusted partner for professional welding and steel solutions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Quality Products</h2>
          <p>
            We offer a comprehensive range of welding and steel products
            for all your professional needs.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Expert Service</h2>
          <p>
            Our experienced team provides expert advice and customized
            solutions for your projects.
          </p>
        </div>
      </div>
    </div>
  );
}


