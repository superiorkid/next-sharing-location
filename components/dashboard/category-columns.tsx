"use client";

import { ColumnDef } from "@tanstack/table-core";
import React, { useState } from "react";

import { Category } from ".prisma/client";
import TableAction from "@/components/dashboard/table-action";
import DataTableColumnHeader from "@/components/dashboard/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteCategory } from "@/_actions/category.action";

export const categoryColumns: ColumnDef<Category>[] = [
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
      const name = row.getValue("name") as string;
      return <div className="font-medium capitalize">{name}</div>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deskripsi" />
    ),
    cell: ({ row }) => {
      const deskripsi = row.getValue("description") as string | null;
      return <div>{deskripsi ?? "tidak ada deskripsi"}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const rows = row.original;

      return (
        <TableAction
          editUrl={`/dashboard/admin/categories/edit/${rows.id}`}
          id={rows.id as string}
          handleDelete={deleteCategory}
        />
      );
    },
  },
];
