import Hero from "@/components/homepage/section/hero";
import Category from "@/components/homepage/section/category";
import Recommendation from "@/components/homepage/section/recommendation";
import ScrollToTop from "@/components/scroll-to-top";

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
