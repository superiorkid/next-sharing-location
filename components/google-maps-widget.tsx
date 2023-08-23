"use client";

import React from "react";
import GoogleMapReact from "google-map-react";
import { Button } from "@/components/ui/button";
import IcBaselineLocationOn from "@/components/icons/IcBaselineLocationOn";

interface GoogleMapsWidgetProps {
  position: string;
  zoom?: number;
}

const MapsMarker = ({ lat, lng }: { lat: number; lng: number }) => {
  return (
    <Button variant="ghost" size="icon" className="hover:bg-transparent">
      <IcBaselineLocationOn className="w-9 h-9 text-rose-400 hover:text-600 hover:scale-110" />
    </Button>
  );
};

function GoogleMapsWidget({ position, zoom = 13 }: GoogleMapsWidgetProps) {
  const center = JSON.parse(position);

  return (
    <div className="h-[15dvh] w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_SERVICE_API_KEY as string }}
        defaultZoom={zoom}
        defaultCenter={center}
        center={center}
        yesIWantToUseGoogleMapApiInternals
      >
        <MapsMarker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMapsWidget;
