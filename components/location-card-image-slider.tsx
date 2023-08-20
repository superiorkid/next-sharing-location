"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { imageKitLoader } from "@/lib/imagekit";
import { cn } from "@/lib/utils";

interface LocationCardImageSliderProps {
  images: string[];
  className?: string;
}

function LocationCardImageSlider({
  images,
  className,
}: LocationCardImageSliderProps) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      modules={[Pagination]}
      pagination={{ dynamicBullets: true }}
      className="h-full"
      loop
    >
      {images.map((image, index) => (
        <React.Fragment key={index}>
          <SwiperSlide>
            <Image
              loader={imageKitLoader}
              priority
              src={image}
              alt="contoh gambar"
              width={500}
              height={500}
              className={cn(
                `object-cover w-full rounded-md hover:scale-105 h-[256px] -z-10 ${className}`
              )}
            />
          </SwiperSlide>
        </React.Fragment>
      ))}
    </Swiper>
  );
}

export default LocationCardImageSlider;
