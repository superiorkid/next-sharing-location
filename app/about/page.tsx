import React from "react";
import { Metadata } from "next";
import SkillIconsNextjsLight from "@/components/icons/SkillIconsNextjsLight";
import SkillIconsTypescript from "@/components/icons/SkillIconsTypescript";
import SkillIconsMongodb from "@/components/icons/SkillIconsMongodb";

export const metadata: Metadata = {
  title: "About - Media Berbagi Lokasi",
  description: "Mengenai website yang dibuat",
};

function Page() {
  return (
    <div className="max-w-4xl py-6 px-3 mx-auto">
      <section>
        <article className="prose dark:prose-invert max-w-[100%]">
          <h2>Tentang website</h2>
          <p>
            Media Informasi Berbagi Lokasi merupakan website yang dimanfaatkan
            untuk membagikan lokasi-lokasi yang menarik di wilayah Kabupaten
            Lombok Timur. Website ini dibangun dengan menerapkan metode Single
            Page Application layout, dimana metode ini dapat memberikan pengguna
            peningkatan kenyamanan dan efisiensi dalam mengakses informasi
            karena dapat menjelajahi informasi lokasi tanpa harus menunggu
            muatan ulang halaman yang berlebihan.
          </p>
          <p>
            Website ini dibangun menggunakan framework{" "}
            <span className="inline-flex items-baseline">
              <SkillIconsNextjsLight className="self-center w-5 h-5 mx-1" />
              <span>Next.js</span>
            </span>
            , dengan bahasa pemrograman{" "}
            <span className="inline-flex items-baseline">
              <SkillIconsTypescript className="self-center w-5 h-5 mx-1" />
              <span>TypeScript</span>
            </span>
            . Pada bagian database menggunakan NoSQL database yaitu{" "}
            <span className="inline-flex items-baseline">
              <SkillIconsMongodb className="self-center w-5 h-5 mx-1" />
              <span>MongoDB</span>
            </span>
            .
          </p>
        </article>
      </section>
    </div>
  );
}

export default Page;
