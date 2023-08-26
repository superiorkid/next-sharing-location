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

const GoogleMapsWidget = dynamic(
  () => import("@/components/google-maps-widget"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[15dvh] w-full" />,
  }
);

const MapsWidget = dynamic(() => import("@/components/dashboard/maps-widget"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

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
        <div className="min-h-full flex space-x-7 max-w-5xl mx-auto">
          <main className="flex-1 min-w-0 overflow-auto bg-background rounded-md">
            <div className="px-6 py-3">
              <div className="flex justify-between items-center">
                <h1 className="text-5xl font-semibold my-6 uppercase">
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

          <aside className="w-80 flex-none relative bg-background rounded-md mt-12">
            <div className="absolute w-full space-y-4">
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
                        {location.address}
                      </p>

                      {location.whatsapp && (
                        <Link
                          href={`https://wa.me/${location.whatsapp}`}
                          target="_blank"
                          className="font-extralight hover:underline hover:cursor-pointer"
                        >
                          <MdiWhatsapp className="inline w-4 h-4 mx-1" />
                          {location.whatsapp}
                        </Link>
                      )}

                      {location.instagram && (
                        <p className="font-extralight">
                          <MdiInstagram className="inline w-4 h-4 mx-1" />
                          {location.instagram}
                        </p>
                      )}

                      {location.facebook && (
                        <p className="font-extralight">
                          <MdiFacebook className="inline w-4 h-4 mx-1" />
                          {location.facebook}
                        </p>
                      )}

                      {location.website && (
                        <p className="font-extralight">
                          <MdiWeb className="inline w-4 h-4 mx-1 self-center" />
                          {location.website}
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="shadow-md w-full h-[253px] p-3 rounded-md">
                <MapsWidget position={location.coordinate} />
                {/*<GoogleMapsWidget position={location.coordinate} />*/}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    );
  }
}

export default Page;
