import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ITooltipHover {
  children: React.ReactNode;
  label: string;
}
export default function TooltipHover({ label, children }: ITooltipHover) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
