import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";
import React from "react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  variant?: "success" | "default";
}

const InfoCard = ({ icon: Icon, label, value, variant }: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {value} {value === 1 ? "Course" : "Courses"}{" "}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
