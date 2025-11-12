import React from "react";
import { Button } from "./ui/button";

interface IYellowButton {
  className?: string;
  disabled?: boolean;
  hidden?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

export default function YellowButton({
  className,
  disabled = false,
  hidden = false,
  onClick,
  type = "button",
  children,
}: IYellowButton) {
  return (
    <Button
      type={type}
      disabled={disabled}
      hidden={hidden}
      onClick={onClick}
      className={`${className} text-s-regular bg-secondary-main text-center font-bold text-neutral-90 hover:bg-secondary-hover focus:bg-secondary-pressed cursor-pointer`}
    >
      {children}
    </Button>
  );
}
