import React from "react";
import { Column } from "@tanstack/table-core";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import IcBaselineKeyboardArrowDown from "@/components/icons/IcBaselineKeyboardArrowDown";
import IcBaselineKeyboardArrowUp from "@/components/icons/IcBaselineKeyboardArrowUp";
import PhCaretUpDown from "@/components/icons/PhCaretUpDown";
import TablerSortDescending from "@/components/icons/TablerSortDescending";
import TablerSortAscending from "@/components/icons/TablerSortAscending";
import TablerEyeOff from "@/components/icons/TablerEyeOff";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === "desc"
                ? `Sorted descending. Click to sort ascending`
                : column.getIsSorted() === "asc"
                ? `Sorted ascending. Click to sort descending`
                : `Not sorted. Click to sort ascending`
            }
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <IcBaselineKeyboardArrowDown
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            ) : column.getIsSorted() === "asc" ? (
              <IcBaselineKeyboardArrowUp
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            ) : (
              <PhCaretUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            aria-label="Sort ascending"
            onClick={() => column.toggleSorting(false)}
          >
            <TablerSortAscending
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Sorting descending"
            onClick={() => column.toggleSorting(true)}
          >
            <TablerSortDescending
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            aria-label="Hide column"
            onClick={() => column.toggleVisibility(false)}
          >
            <TablerEyeOff
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DataTableColumnHeader;
