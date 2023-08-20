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

export const userColumns: ColumnDef<User>[] = [
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
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;

      return <TableAction id={id} />;
    },
  },
];
