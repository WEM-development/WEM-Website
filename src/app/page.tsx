"use client"

import { Card, CardBody, Button, Link } from "@heroui/react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ImageSlider from "@/components/common/ImageSlider";
import Image from "next/image";

const workshopImages = [
  "/assets/workshop-one.jpeg",
  "/assets/workshop-two.jpeg",
  "/assets/workshop-three.jpg",
  "/assets/workshop-four.jpg",
  "/assets/workshop-five.jpg",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[#fdc746] opacity-20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(253, 199, 70, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(253, 199, 70, 0.2) 0%, transparent 50%)'
        }}></div>
        
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Stěhujeme se do nové haly !
            </h1>
            <div className="w-24 h-1 bg-[#fdc746] mx-auto mb-8 shadow-lg shadow-[#fdc746]/50"></div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Nová moderní hala s nejnovějším vybavením pro ještě lepší služby
            </p>
          </div>
        </div>
      </section>

      {/* New Products Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-4">Nové produkty</h2>
          <div className="w-24 h-1 bg-[#fdc746] mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/products#steel-product">
              <Card className="hover:shadow-xl hover:shadow-[#fdc746]/20 transition-all cursor-pointer border-2 border-transparent hover:border-[#fdc746]">
                <CardBody className="p-0 flex flex-col">
                  <div className="relative w-full h-56">
                    <Image
                      src="/assets/steel-product-images/pipe-complex.png"
                      alt="Ocelové konstrukce"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 h-28 flex items-center">
                    <h4 className="text-xl font-semibold line-clamp-2">
                      Výroba ocelových konstrukcí a potrubních celků
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Link>

            <Link href="/products#welding-product">
              <Card className="hover:shadow-xl hover:shadow-[#fdc746]/20 transition-all cursor-pointer border-2 border-transparent hover:border-[#fdc746]">
                <CardBody className="p-0 flex flex-col">
                  <div className="relative w-full h-56">
                    <Image
                      src="/assets/welding-product-images/excavator.jpg"
                      alt="Svářečské práce"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 h-28 flex items-center">
                    <h4 className="text-xl font-semibold line-clamp-2">
                      Svářečské opravy a zámečnické práce
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Link>

            <Link href="/products#custom-product">
              <Card className="hover:shadow-xl hover:shadow-[#fdc746]/20 transition-all cursor-pointer border-2 border-transparent hover:border-[#fdc746]">
                <CardBody className="p-0 flex flex-col">
                  <div className="relative w-full h-56">
                    <Image
                      src="/assets/custom-service-images/IMG_5269.jpeg"
                      alt="Zakázkové svařování"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 h-28 flex items-center">
                    <h4 className="text-xl font-semibold line-clamp-2">
                      Zakázkové svařování
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Workshop Section */}
      <section id="workshop" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold mb-4">Naše hala</h2>
              <div className="w-24 h-1 bg-[#fdc746] mb-8"></div>
              <ImageSlider images={workshopImages} alt="Workshop" />
              <div className="mt-8 space-y-4 text-lg text-gray-700">
                <p>
                  Naše výrobní hala disponuje mostovým jeřábem a plně vybavenou dílnou.
                </p>
                <p>
                  Nacházíme se nedaleko Forum Nová Karolína, což nám umožňuje skvělou dostupnost z jakéhokoliv okolí.
                </p>
                <p>
                  Zabýváme se montáží, výrobou ocelových konstrukcí, potrubních celků a svářečskou zámečnickou výrobou. 
                  Náš dlouhodobý cíl je být věrohodným partnerem pro všechny strany.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <Card>
                <CardBody className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Kde se nacházíme?</h3>
                  <div className="relative w-full h-80 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d786.5160882822947!2d18.2855611737851!3d49.82572549874255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713e3b0617d0c03%3A0x61bf6c3d515c0a80!2zV2VsZGluZyBNb250w6HFvmU!5e0!3m2!1scs!2scz!4v1739118062231!5m2!1scs!2scz"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Naše sociální sítě</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link 
                        href="https://www.facebook.com/profile.php?id=61572748663542"
                        target="_blank"
                        className="text-gray-700 hover:text-[#fdc746] text-lg font-semibold transition"
                      >
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="https://www.instagram.com/welding_montaze/"
                        target="_blank"
                        className="text-gray-700 hover:text-[#fdc746] text-lg font-semibold transition"
                      >
                        Instagram
                      </Link>
                    </li>
                  </ul>
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


