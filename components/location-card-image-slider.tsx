"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function LocationCardImageSlider() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      modules={[Pagination]}
      pagination={{ dynamicBullets: true }}
      loop
    >
      <SwiperSlide>
        <Image
          src="https://picsum.photos/500/500"
          alt="contoh gambar"
          width={500}
          height={500}
          className="object-cover w-full rounded-md hover:scale-105"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="https://picsum.photos/500/500"
          alt="contoh gambar"
          width={500}
          height={500}
          className="object-cover w-full rounded-md hover:scale-105"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="https://picsum.photos/500/500"
          alt="contoh gambar"
          width={500}
          height={500}
          className="object-cover w-full rounded-md hover:scale-105"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default LocationCardImageSlider;
