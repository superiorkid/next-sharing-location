"use client";

import React, { useTransition } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteUser } from "@/_actions/user.action";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function DeleteAccountActionButton() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const deleteAccountHandler = async () => {
    startTransition(() => {
      signOut({ redirect: false });
      deleteUser()
        .then((response) => {
          toast({
            title: "Hapus Akun",
            description: "Berhasil menghapus akun",
          });
          router.push("/");
        })
        .catch((error) => {
          toast({
            title: "Hapus Akun",
            description: "Gagal menghapus akun",
            variant: "destructive",
          });
        });
    });
  };

  return (
    <AlertDialogFooter>
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction onClick={deleteAccountHandler}>
        Lanjutkan
      </AlertDialogAction>
    </AlertDialogFooter>
  );
}

export default DeleteAccountActionButton;
