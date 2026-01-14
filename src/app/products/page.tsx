"use client"

import { Card, CardBody, Button, Link } from "@heroui/react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ImageSlider from "@/components/common/ImageSlider";
import Image from "next/image";

const steelImages = [
  "/assets/steel-product-images/pipe-complex.png",
  "/assets/steel-product-images/20200228_114633.jpg",
  "/assets/steel-product-images/20210212_140350.jpg",
  "/assets/steel-product-images/20210720_130349.jpg",
  "/assets/steel-product-images/20210817_101923.jpg",
  "/assets/steel-product-images/20210817_101933.jpg",
  "/assets/steel-product-images/20220118_144225.jpg",
  "/assets/steel-product-images/20220118_144229.jpg",
  "/assets/steel-product-images/20220118_144246.jpg",
  "/assets/steel-product-images/20220118_144305.jpg",
  "/assets/steel-product-images/20220118_144327.jpg",
  "/assets/steel-product-images/20220203_133511.jpg",
  "/assets/steel-product-images/20220414_103301.jpg",
  "/assets/steel-product-images/pipe.png",
  "/assets/steel-product-images/pipe-moment.png",
];

const weldingImages = [
  "/assets/welding-product-images/excavator.jpg",
  "/assets/welding-product-images/excavator-before.jpg",
  "/assets/welding-product-images/excavator-after.jpg",
  "/assets/welding-product-images/excavator-two-before.jpg",
  "/assets/welding-product-images/excavator-two-after.png",
  "/assets/welding-product-images/spoon-back.jpeg",
  "/assets/welding-product-images/spoon-back-color.jpeg",
  "/assets/welding-product-images/spoon-inside.jpeg",
  "/assets/welding-product-images/20220727_190508.jpg",
  "/assets/welding-product-images/20230524_132329.jpg",
  "/assets/welding-product-images/20230524_150735.jpg",
];

const customImages = [
  "/assets/custom-service-images/IMG_5269.jpeg",
  "/assets/custom-service-images/IMG_5263.jpeg",
  "/assets/custom-service-images/IMG_5264.jpeg",
  "/assets/custom-service-images/IMG_5265.jpeg",
  "/assets/custom-service-images/IMG_5266.jpeg",
  "/assets/custom-service-images/IMG_5267.jpeg",
  "/assets/custom-service-images/IMG_5268.jpeg",
  "/assets/custom-service-images/IMG_5270.jpeg",
  "/assets/custom-service-images/IMG_5274.jpeg",
  "/assets/custom-service-images/IMG_5275.jpeg",
  "/assets/custom-service-images/IMG_5277.jpeg",
  "/assets/custom-service-images/IMG_5284.jpeg",
  "/assets/custom-service-images/IMG_5285.jpeg",
  "/assets/custom-service-images/IMG_5286.jpeg",
];

function OrderCard() {
  return (
    <Card className="h-fit sticky top-24">
      <CardBody className="p-6">
        <h3 className="text-2xl font-bold mb-4">Zakázka na míru</h3>
        <p className="text-gray-700 mb-4">
          V momentální době, pouze pomocí e-mailové komunikace.
        </p>
        <p className="text-black font-semibold mb-6">
          info@weldingmontaze.cz
        </p>
        <Button 
          as={Link}
          href="mailto:info@weldingmontaze.cz"
          className="w-full bg-[#fdc746] text-black font-semibold hover:bg-[#fdb817] transition"
          size="lg"
        >
          Otevřít poštu
        </Button>
      </CardBody>
    </Card>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Products Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-4 uppercase">Produkty</h2>
          <div className="w-24 h-1 bg-[#fdc746] mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="#steel-product">
              <Card className="hover:shadow-xl hover:shadow-[#fdc746]/20 transition-all cursor-pointer border-2 border-transparent hover:border-[#fdc746]">
                <CardBody className="p-0 flex flex-col">
                  <div className="relative w-full h-64">
                    <Image
                      src="/assets/steel-product-images/pipe-complex.png"
                      alt="Ocelové konstrukce"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 h-24 flex items-center justify-center">
                    <h4 className="text-lg font-semibold text-center line-clamp-3">
                      Výroba ocelových konstrukcí a potrubních celků
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Link>

            <Link href="#welding-product">
              <Card className="hover:shadow-xl hover:shadow-[#fdc746]/20 transition-all cursor-pointer border-2 border-transparent hover:border-[#fdc746]">
                <CardBody className="p-0 flex flex-col">
                  <div className="relative w-full h-64">
                    <Image
                      src="/assets/welding-product-images/excavator.jpg"
                      alt="Svářečské práce"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 h-24 flex items-center justify-center">
                    <h4 className="text-lg font-semibold text-center line-clamp-3">
                      Svářečské opravy a zámečnické práce
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Link>

            <Link href="#custom-product">
              <Card className="hover:shadow-xl hover:shadow-[#fdc746]/20 transition-all cursor-pointer border-2 border-transparent hover:border-[#fdc746]">
                <CardBody className="p-0 flex flex-col">
                  <div className="relative w-full h-64">
                    <Image
                      src="/assets/custom-service-images/IMG_5269.jpeg"
                      alt="Zakázkové svařování"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 h-24 flex items-center justify-center">
                    <h4 className="text-lg font-semibold text-center line-clamp-3">
                      Zakázkové svařování
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Link>

          </div>
        </div>
      </section>

      {/* Steel Product */}
      <section id="steel-product" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4">
                Výroba ocelových konstrukcí a potrubních celků
              </h2>
              <div className="w-24 h-1 bg-[#fdc746] mb-6"></div>
              <ImageSlider images={steelImages} alt="Steel constructions" />
              <p className="text-lg text-gray-700 mt-6">
                Máme dlouholetou zkušenost s montáží potrubí ve všech dimenzí a ocelových konstrukcí.
              </p>
            </div>
            <div>
              <OrderCard />
            </div>
          </div>
        </div>
      </section>

      {/* Welding Product */}
      <section id="welding-product" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4">
                Svářečské opravy a zámečnické práce
              </h2>
              <div className="w-24 h-1 bg-[#fdc746] mb-6"></div>
              <ImageSlider images={weldingImages} alt="Welding services" />
              <div className="space-y-4 text-lg text-gray-700 mt-6">
                <p>Svařování pomocí metod EN 141, 111, 136.</p>
                <p>
                  V nabídce máme opravy strojů, výrobu mříží, žebříků, plotů, bran a pažících boxů.
                </p>
              </div>
            </div>
            <div>
              <OrderCard />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Product */}
      <section id="custom-product" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4">Zakázkové svařování</h2>
              <div className="w-24 h-1 bg-[#fdc746] mb-6"></div>
              <ImageSlider images={customImages} alt="Custom welding" />
              <p className="text-lg text-gray-700 mt-6">
                Nabízíme naše služby na míru, v oblastech svařování, zámečnictví až po samotné vyhotovení produktu.
              </p>
            </div>
            <div>
              <OrderCard />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
