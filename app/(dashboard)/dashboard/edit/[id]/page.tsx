import React from "react";
import { getLocationById } from "@/_actions/location.action";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import EditLocationForm from "@/components/dashboard/edit-location-form";
import { getCategories } from "@/_actions/category.action";
import getCurrentUser from "@/_actions/get-current-user";

async function Page({ params }: { params: { id: string } }) {
  const currentUser = await getCurrentUser();
  const location = await getLocationById(params.id);
  const categories = await getCategories();

  if (!location) notFound();

  if (currentUser?.role !== "ADMIN" && currentUser?.id !== location.author.id) {
    return (
      <section className="space-y-4">
        <Header
          title="Akses ditolak"
          shortDescription="Anda tidak memiliki akses untuk sumber daya ini."
        />
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <Header title="Edit Location" shortDescription="Edit location" />
      <div className="border p-6 rounded-md shadow-sm">
        <EditLocationForm categories={categories} location={location} />
      </div>
    </section>
  );

  // if (!location) {
  //   notFound();
  // } else if (
  //   currentUser?.role !== "ADMIN" ||
  //   currentUser.id !== location.authorId
  // ) {
  //   return (
  //     <section className="space-y-4">
  //       <Header
  //         title="Akses ditolak"
  //         shortDescription="Anda tidak memiliki akses untuk sumber daya ini."
  //       />
  //     </section>
  //   );
  // } else {
  //   return (
  //     <section className="space-y-4">
  //       <Header title="Edit Location" shortDescription="Edit location" />
  //       <div className="border p-6 rounded-md shadow-sm">
  //         <EditLocationForm categories={categories} location={location} />
  //       </div>
  //     </section>
  //   );
  // }
}

export default Page;
