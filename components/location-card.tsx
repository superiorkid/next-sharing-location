import React from "react";
import Link from "next/link";

import LocationCardImageSlider from "@/components/location-card-image-slider";

interface LocationCardProps {
  name: string;
  address: string;
  images: string[];
  slug: string;
}

function LocationCard({ name, address, images, slug }: LocationCardProps) {
  let words = name.split(" ");
  let title = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  return (
    <div className="w-full h-auto overflow-hidden rounded-md flex flex-col space-y-1.5">
      <div>
        <LocationCardImageSlider images={images} />
      </div>
      <Link href={`/location/${slug}`}>
        <h4 className="font-semibold">{title}</h4>
        <span className="text-sm text-gray-700 dark:invert">{address}</span>
      </Link>
    </div>
  );
}

export default LocationCard;
