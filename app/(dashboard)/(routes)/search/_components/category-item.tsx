import { cn } from "@/lib/utils";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";
import qs from "query-string";

interface CategoryItemProps {
  value: string;
  label: string;
  icon: IconType;
}

const CategoryItem = ({ value, label, icon: Icon }: CategoryItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = searchParams.get("category")?.toLowerCase();
  const activeTitle = searchParams.get("title");

  const isActive = activeCategory === label.toLowerCase();

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          category: isActive ? undefined : label.toLowerCase(),
          title: activeTitle,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-1 py-2 px-3 text-sm border border-slate-200 dark:border-slate-700 rounded-full hover:border-sky-700 dark:hover:border-sky-400 transition",
        isActive
          ? "border-sky-700 dark:border-sky-400 bg-sky-200/20 dark:bg-sky-900/20"
          : ""
      )}
    >
      {Icon && <Icon />}
      <span className="text-sm truncate">{label}</span>
    </button>
  );
};

export default CategoryItem;
