import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PhBookmarkSimpleFill from "@/components/icons/PhBookmarkSimpleFill";
import { getWishlistTotal } from "@/_actions/location.action";
import getCurrentUser from "@/_actions/get-current-user";
import { cn } from "@/lib/utils";

interface AddWishList {
  slug: string;
  liked: string[];
}

async function AddToWishlist({ slug, liked }: AddWishList) {
  const currentUser = await getCurrentUser();
  const total = await getWishlistTotal(slug);

  return (
    <div className="flex flex-col items-center -space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon" className="p-0">
              <PhBookmarkSimpleFill
                className={cn(
                  "h-8 w-8",
                  liked.includes(currentUser?.id as string) && "text-rose-500"
                )}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Tambah ke daftar keinginan</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p>{total?._count.liked}</p>
    </div>
  );
}

export default AddToWishlist;
