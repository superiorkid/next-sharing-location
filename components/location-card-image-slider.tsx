"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { imageKitLoader } from "@/lib/imagekit";

interface LocationCardImageSliderProps {
  images: string[];
}

function LocationCardImageSlider({ images }: LocationCardImageSliderProps) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      modules={[Pagination]}
      pagination={{ dynamicBullets: true }}
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
              className="object-cover w-full rounded-md hover:scale-105 h-[256px]"
            />
          </SwiperSlide>
        </React.Fragment>
      ))}
    </Swiper>
  );
}

export default LocationCardImageSlider;
