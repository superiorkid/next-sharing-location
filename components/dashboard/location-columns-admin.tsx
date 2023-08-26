"use client";

import { ColumnDef } from "@tanstack/react-table";
import DashboardImages from "@/components/dashboard/dashboard-images";
import { Prisma } from "@prisma/client";
import { Category } from ".prisma/client";
import TableAction from "@/components/dashboard/table-action";
import DataTableColumnHeader from "@/components/dashboard/data-table/data-table-column-header";
import React from "react";
import { deleteLocation } from "@/_actions/location.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/user-card";
import MaterialSymbolsArrowOutwardRounded from "@/components/icons/MaterialSymbolsArrowOutwardRounded";
import MdiEye from "@/components/icons/MdiEye";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export const locationColumnsAdmin: ColumnDef<
  Prisma.LocationGetPayload<{ include: { category: true; author: true } }>
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("name");
      const slug = row.original.slug;

      return (
        <Link href={`/location/${slug}`} className="hover:cursor-pointer">
          {name as string}
        </Link>
      );
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => {
      const rows = row.original;

      return (
        <UserCard
          author={rows.author.name as string}
          authorImage={rows.author.image as string}
          email={rows.author.email as string}
        />
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alamat" />
    ),
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      const description = row.getValue("description");

      return (
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" size="icon">
              <MdiEye className="inline w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="space-y-2">
              <DialogTitle>Deskripsi</DialogTitle>
              <DialogDescription className="prose prose-xl mt-5">
                <p>{description as string}</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategori" />
    ),
    cell: ({ row }) => {
      const category = row.getValue("category") as Category;
      return <Badge variant="secondary">{category.name as string}</Badge>;
    },
  },
  {
    accessorKey: "photos",
    header: "Gambar",
    cell: ({ row }) => {
      const photos = row.getValue("photos");

      return <DashboardImages photos={photos as string[]} />;
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const rows = row.original;
      return (
        <TableAction
          editUrl={`/dashboard/edit/${rows.id}`}
          id={rows.id}
          handleDelete={deleteLocation}
        />
      );
    },
  },
];
