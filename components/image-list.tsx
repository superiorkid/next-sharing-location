"use client";

import React from "react";
import { PhotoView } from "react-photo-view";
import Image from "next/image";

import "react-photo-view/dist/react-photo-view.css";
import { imageKitLoader } from "@/lib/imagekit";
import MdiEye from "@/components/icons/MdiEye";
import { Separator } from "./ui/separator";

interface ImageListProps {
  images: string[];
}

function ImageList({ images }: ImageListProps) {
  return (
    <section className="my-5">
      <h3 className="text-2xl font-semibold my-3">Gambar</h3>
      <Separator className="mb-6 mt-3" />
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <PhotoView
            key={index}
            src={`https://ik.imagekit.io/superiorkid${image}`}
          >
            <picture className="relative group overflow-hidden rounded-md">
              <Image
                loader={imageKitLoader}
                src={image}
                alt={`gambar ${index}`}
                width={1024}
                height={1024}
                loading="lazy"
                className="object-cover w-[156px] h-[156px] group-hover:cursor-pointer brightness-75 group-hover:brightness-100 group-hover:scale-110"
              />
              <MdiEye className="invisible group-hover:visible absolute z-20 w-10 h-10 -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 group-hover:cursor-pointer text-gray-200" />
            </picture>
          </PhotoView>
        ))}
      </div>
    </section>
  );
}

export default ImageList;
