"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

// @ts-ignore
const Quill = dynamic(() => import("react-quill"), { ssr: false });

export const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <div className="w-full dark:bg-slate-300 dark:text-slate-800">
      <Quill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
