"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  alt: string;
}

export default function ImageSlider({ images, alt }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full">
      <Card className="overflow-hidden">
        <CardBody className="p-0">
          <div className="relative aspect-video w-full">
            <Image
              src={images[currentIndex]}
              alt={`${alt} ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </CardBody>
      </Card>
      
      {images.length > 1 && (
        <>
          <Button
            isIconOnly
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            onPress={prevSlide}
            size="lg"
          >
            ‹
          </Button>
          <Button
            isIconOnly
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            onPress={nextSlide}
            size="lg"
          >
            ›
          </Button>
          
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-blue-600" : "w-2 bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
