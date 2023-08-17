"use client";

import { ColumnDef } from "@tanstack/table-core";
import React, { useState } from "react";

import { Category } from ".prisma/client";
import TableAction from "@/components/dashboard/table-action";

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: () => <div>ID</div>,
  },
  {
    accessorKey: "name",
    header: () => <div>Nama</div>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div className="font-medium capitalize">{name}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      const deskripsi = row.getValue("description") as string | null;
      return <div>{deskripsi ?? "tidak ada deskripsi"}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;

      return <TableAction id={id} />;
    },
  },
];
