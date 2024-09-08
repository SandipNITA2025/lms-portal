"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value?: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const Quill = useMemo(() => dynamic(() => import("react-quill")), []);
  return (
    <div className="w-full bg-transparent">
      <Quill theme="bubble" value={value} readOnly />
    </div>
  );
};
