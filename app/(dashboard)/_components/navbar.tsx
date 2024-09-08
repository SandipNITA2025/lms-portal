import React from "react";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";

const Navbar = () => {
  return (
    <div className="px-4 border-b h-full flex items-center bg-white dark:bg-black z-10 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
