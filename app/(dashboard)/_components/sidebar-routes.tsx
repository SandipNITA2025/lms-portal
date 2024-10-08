"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import React from "react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Compass,
    label: "Browse",
    path: "/search",
  },

  {
    icon: Layout,
    label: "Dashboard",
    path: "/dashboard",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    path: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    path: "/teacher/analytics",
  },
];

const SidebarRoutes: React.FC = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.label}
          icon={route.icon}
          label={route.label}
          path={route.path}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
