"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L, { Icon, LatLng, LeafletMouseEvent } from "leaflet";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import Control from "react-leaflet-custom-control";
import { useGeolocation } from "@uidotdev/usehooks";
import TablerCurrentLocation from "@/components/icons/TablerCurrentLocation";

import "leaflet/dist/leaflet.css";

interface CoordinatesProps<TFieldVallues extends FieldValues>
  extends React.HTMLAttributes<HTMLButtonElement> {
  name: Path<TFieldVallues>;
  setValue: UseFormSetValue<TFieldVallues>;
  isLoading: boolean;
  position: LatLng | null;
  setPosition: React.Dispatch<React.SetStateAction<LatLng | null>>;
}

function Coordinates<T extends FieldValues>({
  name,
  setValue,
  position,
  setPosition,
  isLoading,
}: CoordinatesProps<T>) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="block w-full" variant="outline" disabled={isLoading}>
          {position
            ? `Koordinat tempat: ${JSON.stringify(position)}`
            : "Pilih Koordinat"}
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="max-h-[87dvh]">
        <SheetHeader>
          <SheetTitle className="text-center">
            Pilih titik koordinat?
          </SheetTitle>
          <MapContainer
            center={L.latLng(-8.6510907, 116.5299819)}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: 559 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LivePosition
              name={name}
              setValue={setValue}
              position={position}
              setPosition={setPosition}
            />
            <LocationMarker
              name={name}
              setValue={setValue}
              position={position}
              setPosition={setPosition}
            />
          </MapContainer>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

interface LocationMarkerProps<TFieldVallues extends FieldValues>
  extends React.HTMLAttributes<HTMLButtonElement> {
  name: Path<TFieldVallues>;
  setValue: UseFormSetValue<TFieldVallues>;
  position: LatLng | null;
  setPosition: React.Dispatch<React.SetStateAction<LatLng | null>>;
}

const myIcon = new Icon({
  iconUrl: "https://www.svgrepo.com/show/513317/location-pin.svg",
  iconSize: [32, 32],
});

function LocationMarker<T extends FieldValues>({
  name,
  setValue,
  position,
  setPosition,
}: LocationMarkerProps<T>) {
  const map = useMapEvents({
    click(e: LeafletMouseEvent) {
      map.locate();
      const latlng = L.latLng(e.latlng.lat, e.latlng.lng);
      setPosition(latlng);
      setValue(name, position as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={myIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function LivePosition<T extends FieldValues>({
  name,
  setValue,
  position,
  setPosition,
}: LocationMarkerProps<T>) {
  const map = useMap();
  const state = useGeolocation();

  return (
    <Control position="topleft" prepend>
      <Button
        variant="outline"
        size="icon"
        onClick={(e) => {
          map.locate();
          const latlng = L.latLng(
            state.latitude as number,
            state.longitude as number
          );
          setPosition(latlng);
          map.flyTo(
            latlng ?? L.latLng(-8.6510907, 116.5299819),
            map.getMaxZoom()
          );
          setValue(name, position as PathValue<T, Path<T>>, {
            shouldValidate: true,
          });
          // map.setView(latlng ?? [-6.2188034, 106.7974919], 13);
        }}
      >
        <TablerCurrentLocation className="w-5 h-5" />
      </Button>
    </Control>
  );
}

export default Coordinates;
