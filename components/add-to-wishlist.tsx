"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PhBookmarkSimpleFill from "@/components/icons/PhBookmarkSimpleFill";
import { User } from "@prisma/client";
import PhBookmarkSimple from "@/components/icons/PhBookmarkSimple";
import { addToWishlist, removeFromWishlist } from "@/_actions/location.action";
import { useToast } from "@/components/ui/use-toast";

interface AddWishList {
  currentUserId: string;
  slug: string;
  liked: User[];
}

function AddToWishlist({ slug, liked, currentUserId }: AddWishList) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const isAdded = liked.some((val) => val.id === currentUserId);

  const handleWishlist = () => {
    if (!currentUserId) {
      toast({
        title: "Login",
        description: "Login first to access this feature",
      });
    } else {
      const action = isAdded ? removeFromWishlist : addToWishlist;

      startTransition(() => {
        action(slug)
          .then((res) => {
            toast({
              title: isAdded ? "Remove from wishlist" : "Added to wishlist",
            });
          })
          .catch((error) => {
            toast({
              title: isAdded ? "Remove from wishlist" : "Added to wishlist",
              variant: "destructive",
            });
          });
      });
    }
  };

  return (
    <div className="flex flex-col items-center -space-y-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="p-0"
              onClick={handleWishlist}
            >
              {isAdded ? (
                <PhBookmarkSimpleFill className="h-8 w-8 text-rose-500" />
              ) : (
                <PhBookmarkSimple className="h-8 w-8" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Tambah ke daftar keinginan</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p>{liked.length}</p>
    </div>
  );
}

export default AddToWishlist;
