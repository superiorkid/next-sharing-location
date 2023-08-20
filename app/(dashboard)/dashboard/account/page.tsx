import React from "react";

import Header from "@/components/header";
import getCurrentUser from "@/_actions/get-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { headers } from "next/headers";
import MaterialSymbolsMailRounded from "@/components/icons/MaterialSymbolsMailRounded";

async function Page() {
  const currentUser = await getCurrentUser();

  return (
    <section>
      <Header
        title="Account Information"
        shortDescription="your account information"
      />
      <div className="px-6 py-10 bg-gray-50 rounded-md">
        <div className="w-2/3 space-y-6">
          <div className="w-full space-y-2 rounded-md">
            <h2>Profile</h2>
            <Separator />
            <div className="w-full p-5 hover:bg-gray-100 flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={currentUser?.image as string} />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <p>{currentUser?.name}</p>
            </div>
          </div>
          <div className="w-full space-y-2 rounded-md">
            <h2>Email Address</h2>
            <Separator />
            <p className="w-full p-5 hover:bg-gray-100">
              <MaterialSymbolsMailRounded className="w-6 h-6 inline-flex mr-2" />
              {currentUser?.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
