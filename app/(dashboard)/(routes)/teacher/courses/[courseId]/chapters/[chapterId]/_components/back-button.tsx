"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };
  return (
    <button
      onClick={onClick}
      className="flex items-center text-sm hover:opacity-75 transition mb-6"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to course setup
    </button>
  );
};

export default BackButton;
