"use client";

import { ColumnDef } from "@tanstack/table-core";
import TableAction from "@/components/dashboard/table-action";
import React from "react";
import { User } from "@prisma/client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import getCurrentUser from "@/_actions/get-current-user";
import DataTableColumnHeader from "@/components/dashboard/data-table/data-table-column-header";
import { allowedDisplayValues } from "next/dist/compiled/@next/font/dist/constants";
import { Checkbox } from "@/components/ui/checkbox";

export const userColumns: ColumnDef<User>[] = [
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
    accessorKey: "image",
    header: "Gambar",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      return (
        <Image
          src={image}
          alt="profile image"
          height={1024}
          width={1024}
          className="object-cover rounded-full w-[35px] h-[35px]"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as "ADMIN" | "USER";
      return (
        <Badge variant={role === "ADMIN" ? "destructive" : "secondary"}>
          {role}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "action",
  //   header: "",
  //   cell: ({ row }) => {
  //     const id = row.getValue("id") as string;
  //
  //     return <TableAction id={id} />;
  //   },
  // },
];
