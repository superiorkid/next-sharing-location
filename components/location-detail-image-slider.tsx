"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Navigation } from "swiper/modules";

import Image from "next/image";
import { imageKitLoader } from "@/lib/imagekit";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface LocationDetailImageSliderProps {
  photos: string[];
}

function LocationDetailImageSlider({ photos }: LocationDetailImageSliderProps) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      modules={[Navigation]}
      navigation
      className="w-full h-full"
    >
      {photos.map((photo, index) => (
        <SwiperSlide key={index}>
          <Image
            loader={imageKitLoader}
            src={photo}
            alt={`gambar ${index}`}
            width={1024}
            height={600}
            className="w-full h-full object-cover brightness-75"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default LocationDetailImageSlider;
