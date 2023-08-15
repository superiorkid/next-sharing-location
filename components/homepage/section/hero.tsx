import React from "react";

function Hero() {
  return (
    <section className="flex min-h-[65dvh] flex-col items-center justify-center space-y-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-50 to-transparent text-center dark:from-gray-700 md:min-h-[76dvh]">
      <h1 className="leading-8- max-w-4xl text-3xl font-black capitalize tracking-tight md:text-7xl">
        Website berbagi lokasi. implementasi{" "}
        <span className="inline-flex animate-text-gradient bg-gradient-to-r from-airbnb via-[#fbbf24] to-[#d9f99d] bg-[200%_auto] bg-clip-text text-transparent">
          single page application
        </span>
      </h1>
      <blockquote className="max-w-sm font-extralight capitalize tracking-normal text-gray-700 dark:text-gray-300 md:max-w-xl md:text-lg">
        <q>
          cari tempat yang mungkin anda belum tau. tempat disini menarik dan
          worth it untuk dikunjungi
        </q>
      </blockquote>
    </section>
  );
}

export default Hero;
