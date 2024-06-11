"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound: React.FC = () => {
  const router = useRouter();
  const handleReload = () => {
    router.push("/");
  };

  return (
    <div className="bg-no-repeat bg-inherit h-full w-full flex align-center justify-center">
      <h1>Page not found</h1>
      <button onClick={handleReload}>Reload</button>
    </div>
  );
};

export default NotFound;
