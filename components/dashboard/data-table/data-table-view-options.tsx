import React from "react";
import { Table } from "@tanstack/table-core";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import BasilSettingsAdjustSolid from "@/components/icons/BasilSettingsAdjustSolid";
import MaterialSymbolsAddCircleOutline from "@/components/icons/MaterialSymbolsAddCircleOutline";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  newRowLink?: string;
}

function DataTableViewOptions<TData>({
  table,
  newRowLink,
}: DataTableViewOptionsProps<TData>) {
  return (
    <div className="flex space-x-2 justify-end">
      {newRowLink && (
        <Button className="h-8" variant="outline" size="sm">
          <MaterialSymbolsAddCircleOutline className="mr-2 h-4 w-4" />
          New
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <BasilSettingsAdjustSolid className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== undefined && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DataTableViewOptions;
