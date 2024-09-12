"use client";
import { Category } from "@prisma/client";
import React from "react";

import {
  FcMusic,
  FcOldTimeCamera,
  FcSportsMode,
  FcSalesPerformance,
  FcMultipleDevices,
  FcFilmReel,
  FcEngineering,
} from "react-icons/fc";
import { FiCode } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Development: FiCode,
  Engineering: FcEngineering,
  Marketing: FcSalesPerformance,
  Fitness: FcSportsMode,
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Videography: FcFilmReel,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="categories flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => {
        const Icon = iconMap[item.name];
        return (
          <CategoryItem
            key={item.id}
            value={item.id}
            label={item.name}
            icon={Icon}
          />
        );
      })}
    </div>
  );
};

export default Categories;
