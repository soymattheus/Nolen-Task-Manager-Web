"use client";
import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import React from "react";

export function useSpinner() {
  const [showSpinner, setShowSpinner] = React.useState(false);
  return { showSpinner, setShowSpinner };
}

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export function SpinnerCustom() {
  const { showSpinner } = useSpinner();
  if (!showSpinner) return null;
  return (
    <div className="absolute w-full h-full z-99999 items-center justify-center gap-4 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col bg-black/30 p-4 rounded-md">
      <Spinner />
    </div>
  );
}
