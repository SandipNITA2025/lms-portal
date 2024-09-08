import React from "react";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva("border text-center p-4 flex items-center w-full", {
  variants: {
    variant: {
      warning: "border-amber-300 bg-amber-50 text-amber-700",
      success: "border-emerald-300 bg-emerald-50 text-emerald-700",
    },
  },
  defaultVariants: {
    variant: "warning",
  },
});

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
  variant?: "warning" | "success";
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

const Banner = ({ label, variant = "warning" }: BannerProps) => {
  const Icon = iconMap[variant];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="mr-2" /> {label}
    </div>
  );
};

export default Banner;
