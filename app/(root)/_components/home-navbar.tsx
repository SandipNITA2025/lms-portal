import Logo from "@/app/(dashboard)/_components/logo";
import NavbarRoutes from "@/components/navbar-routes";
import React from "react";

const HomeNavbar = () => {
  return (
    <div className="px-4 border-b h-full flex items-center bg-white dark:bg-[#020817] z-10 shadow-sm">
      <Logo />
      <NavbarRoutes />
    </div>
  );
};

export default HomeNavbar;
