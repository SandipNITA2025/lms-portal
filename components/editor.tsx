"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const Editor = ({ value, onChange }: EditorProps) => {
  const Quill = useMemo(() => dynamic(() => import("react-quill")), []);
  return (
    <div className="w-full dark:bg-slate-300 dark:text-slate-800">
      <Quill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
