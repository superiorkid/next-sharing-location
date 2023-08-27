"use client";

import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import Control from "react-leaflet-custom-control";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import MdiGoogleMaps from "@/components/icons/MdiGoogleMaps";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SimpleIconsOpenstreetmap from "@/components/icons/SimpleIconsOpenstreetmap";
import { Icon } from "leaflet";

interface MapsWidgetProps {
  position: string;
}

const myIcon = new Icon({
  iconUrl: "https://www.svgrepo.com/show/513317/location-pin.svg",
  iconSize: [32, 32],
});

function MapsWidget({ position }: MapsWidgetProps) {
  const positionObject = JSON.parse(position) as { lat: number; lng: number };

  return (
    <MapContainer
      center={positionObject}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full"
      style={{
        zIndex: 1,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Control position="topright" prepend>
        <div className="flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`https://maps.google.com/?q=${positionObject.lat},${positionObject.lng}`}
                  target="_blank"
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                >
                  <MdiGoogleMaps className="w-5 h-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Buka dengan google maps</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`http://www.openstreetmap.org/?lat=${positionObject.lat}&lon=${positionObject.lng}&zoom=17&layers=M`}
                  target="_blank"
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                >
                  <SimpleIconsOpenstreetmap className="w-5 h-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Buka dengan OpenStreetMaps</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Control>
      <Marker position={positionObject} icon={myIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapsWidget;
