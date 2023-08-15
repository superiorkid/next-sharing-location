import React from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn(`max-w-screen-xl mx-auto ${className}`)}>{children}</div>
  );
}

export default Container;
