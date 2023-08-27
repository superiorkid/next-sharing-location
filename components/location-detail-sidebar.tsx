import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import IcBaselineLocationOn from "@/components/icons/IcBaselineLocationOn";
import Link from "next/link";
import MdiWhatsapp from "@/components/icons/MdiWhatsapp";
import MdiInstagram from "@/components/icons/MdiInstagram";
import MdiFacebook from "@/components/icons/MdiFacebook";
import MdiWeb from "@/components/icons/MdiWeb";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const MapsWidget = dynamic(() => import("@/components/dashboard/maps-widget"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

interface LocationDetailSidebarProps {
  address: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  website: string;
  coordinate: string;
  className?: string;
}

function LocationDetailSidebar({
  address,
  whatsapp,
  instagram,
  facebook,
  website,
  coordinate,
}: LocationDetailSidebarProps) {
  return (
    <aside className="bg-background rounded-md mt-12 w-80 lg:flex lg:flex-col hidden relative">
      <div className="lg:absolute w-full space-y-4">
        <Accordion
          collapsible
          type="single"
          className="shadow-md w-full rounded-md p-3"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold text-xl">
              Kontak
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p className="font-extralight">
                  <IcBaselineLocationOn className="inline w-4 h-4 mx-1 self-center" />
                  {address}
                </p>

                {whatsapp && (
                  <Link
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    className="font-extralight hover:underline hover:cursor-pointer"
                  >
                    <MdiWhatsapp className="inline w-4 h-4 mx-1" />
                    {whatsapp}
                  </Link>
                )}

                {instagram && (
                  <p className="font-extralight">
                    <MdiInstagram className="inline w-4 h-4 mx-1" />
                    {instagram}
                  </p>
                )}

                {facebook && (
                  <p className="font-extralight">
                    <MdiFacebook className="inline w-4 h-4 mx-1" />
                    {facebook}
                  </p>
                )}

                {website && (
                  <p className="font-extralight">
                    <MdiWeb className="inline w-4 h-4 mx-1 self-center" />
                    {website}
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="shadow-md w-full h-[253px] p-3 rounded-md">
          <MapsWidget position={coordinate} />
          {/*<GoogleMapsWidget position={location.coordinate} />*/}
        </div>
      </div>
    </aside>
  );
}

export default LocationDetailSidebar;
