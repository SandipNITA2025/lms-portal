import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-sky-100",
        success: "bg-emerald-100",
      },
      sizeVariant: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      sizeVariant: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-sky-600",
      success: "text-emerald-600",
    },
    size: {
      sm: "h-4 w-4",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({
  icon: Icon,
  variant,
  sizeVariant,
  size,
}: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, sizeVariant }))}>
      <Icon className={cn(iconVariants({ size }))} />
    </div>
  );
};
