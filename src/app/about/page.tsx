export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our History</h2>
          <p className="text-lg">
            WEM is a leading company in the field of welding and steel processing.
            Our company was founded with a vision to provide quality products
            and services to our customers.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Quality and precision</li>
            <li>Reliability and trustworthiness</li>
            <li>Innovation and professionalism</li>
            <li>Customer satisfaction</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="text-lg">
            Have questions? We're here to help with your projects.
          </p>
        </section>
      </div>
    </div>
  );
}
