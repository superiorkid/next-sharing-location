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

const GoogleMapsWidget = dynamic(
  () => import("@/components/google-maps-widget"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[15dvh] w-full" />,
  }
);

// export async function generateStaticParams() {
//   const locations = await prisma.location.findMany();
//   const res = locations.map((location) => ({
//     slug: location.slug,
//   }));
//
// }

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// export async function generateStaticParams() {
//   const locations = await getLocations();
//
//   return locations.map((location) => ({
//     slug: location.slug,
//   }));
// }

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
                author={location.author.name as string}
                authorImage={location.author.image as string}
                email={location.author.email as string}
                category={location.category.name}
                createdAt={location.createdAt}
              />
              <Separator className="my-3" />

              <article className="prose prose-stone dark:prose-invert my-8">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Animi consequatur cum dicta minima modi nemo perferendis. Ab
                  accusamus aliquid culpa cumque ea eveniet hic iste maxime
                  minima porro quibusdam, ratione similique soluta vero voluptas
                  voluptatibus voluptatum! Adipisci autem beatae, et ipsa itaque
                  labore libero maxime odio quae quibusdam veniam, veritatis?
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Accusamus accusantium aperiam consectetur deleniti deserunt
                  ipsam laudantium nisi quisquam quo, repellendus. Adipisci
                  aperiam architecto autem consequatur consequuntur debitis
                  delectus, excepturi fuga harum hic ipsam iure iusto, labore
                  laboriosam natus nemo numquam omnis perspiciatis possimus quae
                  qui reiciendis rerum tempore totam unde?
                </p>
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
                    Informasi tambahan
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold">alamat</h5>
                        <p className="italic">{location.address}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold">jalan</h5>
                        <p className="italic">jalan: {location.street}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="shadow-md w-full p-3 rounded-md">
                <GoogleMapsWidget position={location.coordinate} />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    );
  }
}

export default Page;
