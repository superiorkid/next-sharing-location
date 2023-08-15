import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCategory, getCategories } from "@/_actions/category.action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import HumbleiconsDotsHorizontal from "@/components/icons/HumbleiconsDotsHorizontal";
import IcTwotoneAdd from "@/components/icons/IcTwotoneAdd";
import { Input } from "@/components/ui/input";
import MaterialSymbolsDeleteOutline from "@/components/icons/MaterialSymbolsDeleteOutline";
import SolarPenNewRoundBold from "@/components/icons/SolarPenNewRoundBold";
import Link from "next/link";
import { cn } from "@/lib/utils";
import IcSharpFilterAlt from "@/components/icons/IcSharpFilterAlt";
import MaterialSymbolsContentCopyRounded from "@/components/icons/MaterialSymbolsContentCopyRounded";
import { useRouter } from "next/navigation";
import TableAction from "@/components/dashboard/table-action";
import DataTable from "@/components/dashboard/data-table";
import { categoryColumns } from "@/components/dashboard/category-columns";

async function Page() {
  const categories = await getCategories();
  return (
    <div className="border p-6 rounded-md shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <Input
          type="search"
          className="w-1/3 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-2"
          placeholder="Search by name..."
        />
        <div className="flex items-center space-x-2">
          <Link
            href="/dashboard/admin/categories/add"
            className={cn(
              "flex items-center",
              buttonVariants({ variant: "outline", size: "sm" })
            )}
          >
            <IcTwotoneAdd className="w-4 h-4 mr-0.5" />
            Add Category
          </Link>
          <Button variant="outline" size="sm" className="items-center">
            <IcSharpFilterAlt className="mr-2 w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>
      <DataTable columns={categoryColumns} data={categories} />
      {/*<Table>*/}
      {/*  <TableCaption>Daftar semua kategori</TableCaption>*/}
      {/*  <TableHeader>*/}
      {/*    <TableRow>*/}
      {/*      <TableHead>No</TableHead>*/}
      {/*      <TableHead className="w-[250px]">Id</TableHead>*/}
      {/*      <TableHead>Nama</TableHead>*/}
      {/*      <TableHead>Deskripsi</TableHead>*/}
      {/*      <TableHead className="w-[120px]"></TableHead>*/}
      {/*    </TableRow>*/}
      {/*  </TableHeader>*/}
      {/*  <TableBody>*/}
      {/*    {categories?.map((category, index) => (*/}
      {/*      <TableRow key={index}>*/}
      {/*        <TableCell className="font-medium">{index + 1}</TableCell>*/}
      {/*        <TableCell className="font-medium">{category.id}</TableCell>*/}
      {/*        <TableCell>{category.name}</TableCell>*/}
      {/*        <TableCell>*/}
      {/*          {category.description ?? (*/}
      {/*            <span className="text-sm text-gray-600">*/}
      {/*              deskripsi kosong*/}
      {/*            </span>*/}
      {/*          )}*/}
      {/*        </TableCell>*/}
      {/*        <TableCell>*/}
      {/*          <TableAction id={category.id} />*/}
      {/*        </TableCell>*/}
      {/*      </TableRow>*/}
      {/*    ))}*/}
      {/*  </TableBody>*/}
      {/*</Table>*/}
    </div>
  );
}

export default Page;
