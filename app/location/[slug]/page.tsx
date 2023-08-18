import React from "react";
import Container from "@/components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Comment from "@/components/comment";
import { getLocation } from "@/_actions/location.action";
import Image from "next/image";
import { imageKitLoader } from "@/lib/imagekit";
import LocationCardImageSlider from "@/components/location-card-image-slider";
import AuthorInformation from "@/components/author-information";

// export async function generateStaticParams() {
//   const locations = await getLocations();
//
//   return locations?.map((location) => ({
//     slug: location.slug,
//   }));
// }

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function Page({ params, searchParams }: PageProps) {
  const location = await getLocation(params.slug);

  return (
    <Container>
      <div className="h-[52dvh] bg-gray-400 mt-1 rounded-md overflow-hidden">
        <LocationCardImageSlider images={location.photos} />
      </div>
      <div className="min-h-full flex space-x-7 -mt-14 max-w-5xl mx-auto">
        <main className="flex-1 min-w-0 overflow-auto bg-background rounded-md">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="h-14 space-x-5 px-3 w-full justify-normal">
              <TabsTrigger value="overview" className="h-full">
                Overview
              </TabsTrigger>
              <TabsTrigger value="commets" className="h-full">
                Comments
              </TabsTrigger>
            </TabsList>
            <Separator />
            <div className="px-6 py-3">
              <TabsContent value="overview">
                <h1 className="text-5xl font-semibold tracking-wide my-6">
                  {location.name}
                </h1>
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
                  <p>{location.description}</p>
                </article>

                <Comment slug={location.slug} id={location.id} />
              </TabsContent>
              <TabsContent value="commets">Comments</TabsContent>
            </div>
          </Tabs>
        </main>

        <aside className="w-72 flex-none relative bg-background rounded-md">
          <div className="absolute shadow-md w-full p-3 rounded-md">
            <h3 className="h-11">Contact</h3>
            <Separator />
          </div>
        </aside>
      </div>
    </Container>
  );
}

export default Page;
