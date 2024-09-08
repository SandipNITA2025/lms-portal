"use client";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import queryString from "query-string";
import { useDebounce } from "@/hooks/use-debounce";

const SearchInput = () => {
  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value, 500);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category")?.toLowerCase();

  useEffect(() => {
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          category: activeCategory,
          title: debouncedValue,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    router.push(url);
  }, [debouncedValue, activeCategory, pathname, router]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600 dark:text-slate-400" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 dark:bg-slate-800 focus-visible:ring-slate-200 dark:focus-visible:ring-slate-700"
        placeholder="Search for a course..."
      />
    </div>
  );
};

export default SearchInput;
