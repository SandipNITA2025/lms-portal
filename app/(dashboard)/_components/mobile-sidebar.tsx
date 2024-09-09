import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu className="h-6 w-6 text-slate-600 dark:text-slate-400" />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
