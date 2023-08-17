import Hero from "@/components/homepage/section/hero";
import Category from "@/components/homepage/section/category";
import Recommendation from "@/components/homepage/section/recommendation";
import ScrollToTop from "@/components/scroll-to-top";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Berbagi Lokasi",
  description:
    "Penerapan Single Page Application (SPA) Layout Web pada Media Informasi Berbagi Lokasi di Lombok Timur",
};

export default async function Home() {
  return (
    <>
      <Hero />
      <Category />
      <Recommendation />
      <ScrollToTop />
    </>
  );
}
