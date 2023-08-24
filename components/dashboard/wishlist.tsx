"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Location } from "@prisma/client";
import Link from "next/link";
import { removeFromWishlist } from "@/_actions/location.action";
import { useToast } from "@/components/ui/use-toast";

interface WishListProps {
  wishlist: Location[] | null;
}

function WishList({ wishlist }: WishListProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <div className="space-y-1.5">
      {wishlist?.length ? (
        wishlist?.map((list, index) => (
          <div
            key={index}
            className="px-5 py-2 bg-gray-50 hover:bg-gray-100 rounded-md flex justify-between items-center shadow-sm capitalize"
          >
            <Link
              href={`/location/${list.slug}`}
              className="font-light hover:underline hover:cursor-pointer"
            >
              {list.name}
            </Link>
            <Button
              variant="link"
              size="sm"
              className="text-rose-500"
              onClick={() =>
                startTransition(() => {
                  removeFromWishlist(list.slug)
                    .then((res) => {
                      toast({
                        title: "Berhasil menghapus wishlist",
                      });
                    })
                    .catch((error) => {
                      toast({
                        title: "Gagal menghapus wishlist",
                        variant: "destructive",
                      });
                    });
                })
              }
            >
              Hapus
            </Button>
          </div>
        ))
      ) : (
        <p className="px-5 py-2 bg-gray-50 hover:bg-gray-100 rounded-md items-center shadow-sm capitalize text-sm flex justify-center text-rose-500">
          daftar keinginan anda kosong.
        </p>
      )}
    </div>
  );
}

export default WishList;
