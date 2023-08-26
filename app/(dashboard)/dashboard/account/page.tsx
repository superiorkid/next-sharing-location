import React from "react";

import Header from "@/components/header";
import getCurrentUser from "@/_actions/get-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import MaterialSymbolsMailRounded from "@/components/icons/MaterialSymbolsMailRounded";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteAccountActionButton from "@/components/dashboard/delete-account-action-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informasi Akun - Media Berbagi Lokasi",
  description: "Informasi akun. media informasi berbagi lokasi di lombok timur",
};

async function Page() {
  const currentUser = await getCurrentUser();

  return (
    <section>
      <Header title="Informasi Akun" shortDescription="Informasi umum akun" />
      <div className="px-6 py-10 bg-gray-50 dark:bg-background dark:text-foreground rounded-md">
        <div className="w-2/3 space-y-6">
          <div className="w-full space-y-2 rounded-md">
            <h2>Profile</h2>
            <Separator />
            <div className="w-full p-5 hover:bg-gray-100 dark:hover:bg-muted-foreground rounded-md flex items-center space-x-2">
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
            <p className="w-full p-5 hover:bg-gray-100 dark:hover:bg-muted-foreground rounded-md">
              <MaterialSymbolsMailRounded className="w-6 h-6 inline-flex mr-2" />
              {currentUser?.email}
            </p>
          </div>

          {currentUser?.role !== "ADMIN" && (
            <div className="w-full space-y-2 rounded-md">
              <h2 className="text-destructive">Hapus Akun</h2>
              <Separator />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full h-12">
                    Hapus akun anda
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Apa anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak bisa dibatalkan. Tindakan ini akan
                      menghapus akun Anda secara permanen dan menghapus data
                      Anda dari server kami.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <DeleteAccountActionButton />
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Page;
