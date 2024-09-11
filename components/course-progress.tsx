import React from "react";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  varient: "success" | "default";
  progressCount: number;
  size?: "sm" | "default";
}

const colorByVarient = {
  default: "text-emerald-700 dark:text-emerald-400",
  success: "text-sky-700 dark:text-sky-400",
};

const sizeByVarient = {
  default: "text-xs",
  sm: "text-sm",
};

const CourseProgress = ({
  varient,
  progressCount,
  size,
}: CourseProgressProps) => {
  return (
    <div>
      <Progress value={progressCount} className={`h-2`} variant={varient} />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700 dark:text-sky-400",
          colorByVarient[varient || "default"],
          sizeByVarient[size || "default"]
        )}
      >
        {Math.round(progressCount)}% complete
      </p>
    </div>
  );
};

export default CourseProgress;
