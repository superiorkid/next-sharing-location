"use client";

import { ColumnDef } from "@tanstack/react-table";
import DashboardImages from "@/components/dashboard/dashboard-images";
import { Prisma } from "@prisma/client";
import { Category } from ".prisma/client";
import TableAction from "@/components/dashboard/table-action";
import DataTableColumnHeader from "@/components/dashboard/data-table/data-table-column-header";
import React from "react";
import { deleteLocation } from "@/_actions/location.action";

export const locationColumn: ColumnDef<
  Prisma.LocationGetPayload<{ include: { category: true; author: true } }>
>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: "street",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jalan" />
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alamat" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deskripsi" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kategori" />
    ),
    cell: ({ row }) => {
      const category = row.getValue("category") as Category;
      return category.name;
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
      return <TableAction id={rows.id} handleDelete={deleteLocation} />;
    },
  },
];
