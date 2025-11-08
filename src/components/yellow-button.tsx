import { Button } from "./ui/button";

interface IYellowButton {
  label: string;
  className?: string;
  disabled?: boolean;
  hidden?: boolean;
  onClick?: () => void;
}

export default function YellowButton({
  label,
  className,
  disabled = false,
  hidden = false,
  onClick,
}: IYellowButton) {
  return (
    <Button
      type="button"
      disabled={disabled}
      hidden={hidden}
      onClick={onClick}
      className={`${className} text-s-regular bg-secondary-main text-center font-bold text-neutral-90 hover:bg-secondary-hover focus:bg-secondary-pressed cursor-pointer`}
    >
      {label}
    </Button>
  );
}
