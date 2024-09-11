"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  id: string;
  courseId: string;
  title: string;
  isCompleted: boolean;
  isLocked: boolean;
}

const CourseSidebarItem = ({
  id,
  courseId,
  title,
  isCompleted,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 dark:text-slate-400 text-sm font-medium pl-6 py-2 transition-all relative",
        "hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200/20 dark:hover:bg-slate-700/20",
        isActive &&
          "text-slate-700 dark:text-slate-300 bg-sky-200/40 dark:bg-sky-700/40",
        isCompleted && "text-emerald-700 dark:text-emerald-400",
        isCompleted && isActive && "bg-emerald-200/20 dark:bg-emerald-700/20",
      )}
    >
      <div className="flex items-center gap-x-2">
        <Icon size={18} />
        <span>{title}</span>
      </div>
    </button>
  );
};

export default CourseSidebarItem;
