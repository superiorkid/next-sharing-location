"use client";

import React from "react";
import Image from "next/image";
import { imageKitLoader } from "@/lib/imagekit";
import { PhotoView } from "react-photo-view";

interface DashboardImagesProps {
  photos: string[];
}

function DashboardImages({ photos }: DashboardImagesProps) {
  return (
    <div className="flex space-x-1">
      {photos.map((photo, index) => (
        <Image
          loader={imageKitLoader}
          src={photo}
          alt={`gambar ${index}`}
          key={index}
          width={1024}
          height={1024}
          className="object-cover w-[35px] h-[35px] rounded-sm"
        />
      ))}
    </div>
  );
}

export default DashboardImages;
