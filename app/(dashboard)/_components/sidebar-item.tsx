"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarProps {
  icon: LucideIcon;
  label: string;
  path: string;
}

const SidebarItem: React.FC<SidebarProps> = ({ icon: Icon, label, path }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && path === "/") ||
    pathname === path ||
    pathname.startsWith(`${path}/`);

  const onClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 dark:text-slate-400 text-sm font-[500] pl-5 py-4 pr-0 transition-all hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-300/20 relative",
        isActive
          ? "text-sky-700 dark:text-sky-400 bg-sky-200/20 hover:bg-sky-200/20"
          : ""
      )}
    >
      <Icon
        size={22}
        className={cn(
          "text-slate-500 dark:text-slate-400",
          isActive ? "text-sky-700 dark:text-sky-400" : ""
        )}
      />
      <span>{label}</span>

      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all absolute right-0",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;
