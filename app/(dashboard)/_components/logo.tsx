"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className="flex items-center " href="/">
      <Image src="/logo.png" alt="Logo" width={28} height={28} />
      <span className="pl-1 text-xl font-semibold">LearnGo.</span>
    </Link>
  );
};

export default Logo;
