import React from "react";
import Link from "next/link";

import LocationCardImageSlider from "@/components/location-card-image-slider";

function LocationCard() {
  return (
    <div className="w-full h-auto overflow-hidden rounded-md flex flex-col space-y-1.5">
      <div>
        <LocationCardImageSlider />
      </div>
      <Link href="/location/detail-lokasi">
        <h4 className="font-semibold">Warung makan minang</h4>
        <span className="text-sm text-gray-700 dark:invert">
          Penye bat, sakra
        </span>
      </Link>
    </div>
  );
}

export default LocationCard;
