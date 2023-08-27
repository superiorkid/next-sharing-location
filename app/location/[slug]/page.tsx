import React from "react";
import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import Comment from "@/components/comment";
import { getLocation } from "@/_actions/location.action";
import AuthorInformation from "@/components/author-information";
import ImageList from "@/components/image-list";
import AddToWishlist from "@/components/add-to-wishlist";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { notFound } from "next/navigation";
import getCurrentUser from "@/_actions/get-current-user";
import { Metadata } from "next";
import IcBaselineLocationOn from "@/components/icons/IcBaselineLocationOn";
import MdiWeb from "@/components/icons/MdiWeb";
import MdiWhatsapp from "@/components/icons/MdiWhatsapp";
import MdiInstagram from "@/components/icons/MdiInstagram";
import MdiFacebook from "@/components/icons/MdiFacebook";
import Link from "next/link";
import LocationDetailImageSlider from "@/components/location-detail-image-slider";
import LocationDetailSidebar from "@/components/location-detail-sidebar";

const GoogleMapsWidget = dynamic(
  () => import("@/components/google-maps-widget"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[15dvh] w-full" />,
  }
);

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const location = await getLocation(params.slug);

  return {
    title: `${location.name} - Media Berbagi Lokasi`,
    description: `Detail Lokasi dari ${location.name}`,
  };
}

async function Page({ params, searchParams }: PageProps) {
  const location = await getLocation(params.slug);
  const currentUser = await getCurrentUser();

  if (!location) {
    notFound();
  } else {
    return (
      <Container>
        <div className="min-h-full flex flex-col lg:flex-row space-x-7 max-w-5xl mx-auto">
          <main className="flex-1 min-w-0 overflow-auto bg-background rounded-md">
            <div className="px-6 py-3">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl lg:text-5xl font-semibold my-6 uppercase">
                  {location.name}
                </h1>
                <AddToWishlist
                  slug={location.slug}
                  liked={location.liked}
                  currentUserId={currentUser?.id as string}
                />
              </div>
              <Separator className="my-3" />
              <AuthorInformation
                slug={location.slug as string}
                author={location.author.name as string}
                authorImage={location.author.image as string}
                email={location.author.email as string}
                category={location.category.name}
                createdAt={location.createdAt}
              />
              <Separator className="my-3" />
              <article className="prose prose-stone dark:prose-invert my-8">
                <p>{location.description}</p>
              </article>

              <ImageList images={location.photos} />
              <Comment slug={location.slug} />
            </div>
          </main>

          <LocationDetailSidebar
            address={location.address}
            facebook={location.facebook as string}
            website={location.website as string}
            coordinate={location.coordinate}
            whatsapp={location.whatsapp as string}
            instagram={location.instagram as string}
          />
        </div>
      </Container>
    );
  }
}

export default Page;
