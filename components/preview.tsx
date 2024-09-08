"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value?: string;
}

// Dynamically load Quill only on the client side
const Quill = dynamic(() => import("react-quill"), { ssr: false });

export const Preview = ({ value }: PreviewProps) => {
  return (
    <div className="w-full bg-transparent">
      <Quill theme="bubble" value={value} readOnly />
    </div>
  );
};
