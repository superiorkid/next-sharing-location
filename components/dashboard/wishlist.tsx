import React from "react";
import { Button } from "@/components/ui/button";
import MaterialSymbolsDeleteOutline from "@/components/icons/MaterialSymbolsDeleteOutline";

function WishList() {
  return (
    <>
      <div className="p-5 bg-gray-50 hover:bg-gray-100 rounded-md flex justify-between items-center">
        <p>KP minimaket</p>
        <Button variant="destructive" size="icon">
          <MaterialSymbolsDeleteOutline className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-5 bg-gray-50 hover:bg-gray-100 rounded-md flex justify-between items-center">
        <p>KP minimaket</p>
        <Button variant="destructive" size="icon">
          <MaterialSymbolsDeleteOutline className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-5 bg-gray-50 hover:bg-gray-100 rounded-md flex justify-between items-center">
        <p>KP minimaket</p>
        <Button variant="destructive" size="icon">
          <MaterialSymbolsDeleteOutline className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
}

export default WishList;
