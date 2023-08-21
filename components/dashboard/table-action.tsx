"use client";

import React, { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import HumbleiconsDotsHorizontal from "@/components/icons/HumbleiconsDotsHorizontal";
import MaterialSymbolsContentCopyRounded from "@/components/icons/MaterialSymbolsContentCopyRounded";
import SolarPenNewRoundBold from "@/components/icons/SolarPenNewRoundBold";
import MaterialSymbolsDeleteOutline from "@/components/icons/MaterialSymbolsDeleteOutline";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface TableActionProps {
  id: string;
  handleDelete: (id: string) => Promise<any>;
}

function TableAction({ id, handleDelete }: TableActionProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDeleteAction = async (id: string) => {
    startTransition(() => {
      handleDelete(id)
        .then((response) => {
          toast({
            title: "Hapus",
            description: "Berhasil",
          });
          router.refresh();
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Hapus",
            description: "Gagal manghapus",
          });
        });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isPending}
          variant="secondary"
          size="icon"
          className="bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <HumbleiconsDotsHorizontal className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Pilih Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="items-center">
          <MaterialSymbolsContentCopyRounded className="w-4 h-4 mr-2" />
          Copy ID to clipboard
        </DropdownMenuItem>
        <DropdownMenuItem className="items-center">
          <SolarPenNewRoundBold className="mr-2 w-4 h-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="items-center"
          onClick={() => handleDeleteAction(id)}
        >
          <MaterialSymbolsDeleteOutline className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TableAction;
