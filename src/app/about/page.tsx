"use client"

import { Card, CardBody, Link } from "@heroui/react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold text-center mb-4">O naší společnosti</h1>
          <div className="w-24 h-1 bg-[#fdc746] mx-auto mb-16"></div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardBody className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-8 text-center">Vlastníci</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Owner 1 */}
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">TOMÁŠ WALTER</h3>
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        <span className="font-semibold">IČO:</span> 08604134
                        <span className="font-semibold">DIČ:</span> CZ8708065619
                      </p>
                      <Link
                        href="tel:+420773266677"
                        className="block text-gray-700 hover:text-[#fdc746] text-lg font-semibold transition"
                      >
                        +420 773 266 677
                      </Link>
                      <Link
                        href="mailto:info@weldingmontaze.cz"
                        className="block text-gray-700 hover:text-[#fdc746] font-semibold transition"
                      >
                        info@weldingmontaze.cz
                      </Link>
                    </div>
                  </div>

                  {/* Owner 2 */}
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">MILAN CHOVANEC</h3>
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        <span className="font-semibold">IČO:</span>
                      </p>
                      <Link
                        href="tel:+420774357693"
                        className="block text-gray-700 hover:text-[#fdc746] text-lg font-semibold transition"
                      >
                        +420 774 357 693
                      </Link>
                      <Link
                        href="mailto:info@weldingmontaze.cz"
                        className="block text-gray-700 hover:text-[#fdc746] font-semibold transition"
                      >
                        info@weldingmontaze.cz
                      </Link>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Company Info */}
            <div className="mt-12 text-center">
              <Card className="shadow-lg">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Welding Montáže</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    Profesionální svařovací a montážní služby v Ostravě
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-gray-600">
                    <Link
                      href="mailto:info@weldingmontaze.cz"
                      className="text-gray-700 hover:text-[#fdc746] font-semibold transition"
                    >
                      info@weldingmontaze.cz
                    </Link>
                    <span className="hidden sm:inline">|</span>
                    <Link
                      href="tel:+420773266677"
                      className="text-gray-700 hover:text-[#fdc746] font-semibold transition"
                    >
                      +420 773 266 677
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
